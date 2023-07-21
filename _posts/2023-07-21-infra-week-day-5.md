---
title: "Infrastructure Week - Day 5: Making Distributed Infrastructure Work for Distributed Teams"
layout: post
---

Void runs a distributed team of maintainers and contributors.  Making
infrastructure work for any team is a confluence of goals, user
experience choices, and hard requirements.  Making infrastructure work
for a distributed team adds on the complexity of accessing everything
securely over the open internet, and doing so in a way that is still
convenient and easy to setup.  After all, a light switch is difficult
to use is likely to lead to lights being left on.

We take several design criteria into mind when designing new systems
and services that make Void work.  We also periodically re-evaluate
systems that have been built to ensure that they still follow good
design practices in a way that we are able to maintain, and that does
what we want.  Lets dive in to some of these design practices.

## No Maintainer Facing VPNs

VPNs, or Virtual Private Networks are ways of interconnecting systems
such that the network in between appears to vanish beneath a layer of
abstraction.  WireGuard, OpenVPN, and IPSec are examples of VPNs.
OpenVPN and IPSec, a client program handles encryption and decryption
of traffic on a tunnel or tap device that translates packets into and
out of the kernel network stack.  If you work in a field that involves
using a computer for your job, your employer may make use of a VPN to
grant your device connectivity to their corporate network environment
without you having to be physically present in a building.  VPN
technologies can also be used to make multiple physical sites appear
to all be on the same network.

Void uses WireGuard to provide machine-to-machine connectivity for our
fleet, but only within our fleet.  Maintainers always access services
without a VPN.  Why do we do this, and how do we do it?  First the
why.  We operate in this way because corporate VPNs are often
cumbersome, require split horizon DNS (where you get different DNS
answers depending on where you resolve from) and require careful
planning to make sure no subnet overlap occurs between the VPN, the
network you are connecting to, and your local network.  If there were
an overlap, the kernel would be unable to determine where to send the
packets since it has multiple routes for the same subnets.  There are
cases where this is a valid network topology (ECMP), but that is not
what is being discussed here.  We also have no reason to use a VPN.
Most of the use cases that still require a VPN have to do with
transporting arbitrary TCP streams across a network, but this is
unnecessary.  For Void, all our services are either HTTP based or are
transported over SSH.

For almost all our systems that we interact with daily, either a web
interface or HTTP-based API is provided.  For the devspace file
hosting system, maintainers can use SFTP via SSH.  Both HTTP and SSH
have robust, extremely well tested authentication and encryption
options.  When designing a system for secure access, defense in depth
is important, but so is trust that the cryptographic primitives you
have selected actually work.  We trust that HTTPS works, and so there
is no need to wrap the connection in an additional layer of
encryption.  The same goes for SSH, which we use exclusively
public-key authentication for.  This choice is sometimes challenging
to maintain, since it means that we need to ensure highly available
HTTP proxies and secure, easily maintained SSH key implementations, we
have found it works well for us.  In addition to the static files that
all our tier 1 mirrors serve, the mirrors are additionally capable of
acting as proxies.  This allows us to terminate the externally trusted
TLS session at a webserver running nginx, and then pass the traffic
over our internal encrypted fabric to the destination service.

For SSH we simply make use of `AuthorizedKeysCommand` to summon keys
from NetAuth allowing authorized maintainers to log onto servers or
ssh-enabled services wherever their keys are validated.  For the
devspace service which has a broader ACL than our base hardware, we
can enhance its separation by running an SFTP server distinct from the
host sshd.  This allows us to ensure that it is impossible for a key
validated for devspace to inadvertently authorize a shell login to the
underlying host.

For all other services, we make use of the service level
authentication as and when required.  We use combinations of Native
NetAuth, LDAP proxies, and PAM helpers to make all access seamless for
maintainers via our single sign on system.  Removing the barrier of a
VPN also means that during an outage, there's one less component we
need to troubleshoot and debug, and one less place for systems to
break.

## Use of Composable Systems

Distributed systems are often made up of complex, interdependent
sub-assemblies.  This level of complexity is fine for dedicated teams
who are paid to maintain systems day in and day out, but is difficult
to pull off with an all-volunteer team that works on Void in their
free time.  Distributed systems are also best understood on a
whiteboard, and this doesn't lend itself well to making a change on a
laptop from a train, or reviewing a delta from a tablet between other
tasks.  While substantive changes are almost always made from a full
terminal, the ratio of substantive changes to items requiring only
quick verification is significant, and its important to maintain a
level of understand-ability.

In order to maintain the level of understand-ability of the
infrastructure at a level that permits a reasonable time investment,
we make use of composable systems.  Composable systems can best be
thought of as infrastructure built out of common sub-assemblies.  Think
Lego blocks for servers.  This allows us to have a common base library
of components, for example webservers, synchronization primitives, and
timers, and then build these into complex systems through joining
their functionality together.

We primarily use containers to achieve this composeability.  Each
container performs a single task or a well defined sub-process in a
larger workflow.  For example we can look at the workflow required to
serve <https://man.voidlinux.org/> In this workflow, a task runs
periodically to extract all man pages from all packages, then another
process runs to copy those files to the mirrors, and finally a process
runs to produce an HTTP response to a given man page request.  Notice
there that its an HTTP response, but the man site is served securely
over HTTPS.  This is because across all of our web-based services we
make use of common infrastructure such as load balancers and our
internal network.  This allows applications to focus on their
individual functions without needing to think about the complexity of
serving an encrypted connection to the outside world.

By designing our systems this way, we also gain another neat feature:
local testing.  Since applications can be broken down into smaller
building blocks, we can take just the single building block under
scrutiny and run it locally.  Likewise, we can upgrade individual
components of the system to determine if they improve or worsen a
problem.  With some clever configuration, we can even upgrade half of
a system that's highly available and compare the old and new
implementations side by side to see if we like one over the other.
This composability enables us to configure complex systems as
individual, understandable components.

Its worth clarifying though that this is not necessarily a
microservices architecture.  We don't really have any services that
could be defined as microservices in the conventional sense.  Instead
this architecture should be thought of as the Unix Philosophy as
applied to infrastructure components.  Each component has a single
well understood goal and that's all it does.  Other goals are
accomplished by other services.

We assemble all our various composed services into the service suite
that Void provides via our orchestration system (Nomad) and our load
balancers (nginx) which allow us to present the various disparate
systems as though they were one to the outside world, while still
maintaining them as separate service "verticals" side by side each
other internally.

## Everything in Git

Void's packages repo is a large git repo with hundreds of contributors
and many maintainers.  This package bazaar contains all manner of
different software that is updated, verified, and accepted by a team
that spans the globe.  Our infrastructure is no different, but
involves fewer people.  We make use of two key systems to enable our
Infrastructure as Code (IaC) approach.

The first of these tools is Ansible.  Ansible is a configuration
management utility written in python which can programatically SSH
into machines, template files, install and remove packages and more.
Ansible takes its instructions as collections of YAML files called
roles that are assembled into playbooks (composeability!).  These
roles come from either the main void-infrastructure repo, or as
individual modules from the void-ansible-roles organization on GitHub.
Since this is code checked into Git, we can use ansible-lint to ensure
that the code is consistent and lint-free.  We can then review the
changes as a diff, and work on various features on branches just like
changes to void-packages.  The ability to review what changed is also
a powerful debugging tool to allow us to see if a configuration delta
led to or resolved a problem, and if we've encountered any similar
kind of change in the past.

The second tool we use regularly is Terraform.  Whereas Ansible
configures servers, Terraform configures services.  We can apply
Terraform to almost any service that has an API as most popular
services that Void consumes have terraform providers.  We use
Terraform to manage our policy files that are loaded into Nomad,
Consul and Vault, we use it to provision and deprovision machines on
DigitalOcean, Google and AWS, and we use it to update our DNS records
as services change.  Just like Ansible, Terraform has a linter, a
robust module system for code re-use, and a really convenient system
for producing a diff between what the files say the service should be
doing and what it actually is doing.

Perhaps the most important use of Terraform for us is the formalized
onboarding and offboarding process for maintainers.  When a new
maintainer is proposed and has been accepted through discussion within
the Void team, we'll privately reach out to them to ask if they want
to join the project.  Given that a candidate accepts the offer to join
the group of pkg-committers, the action that formally brings them on
to the team is a patch applied to the Terraform that manages our
GitHub organization and its members.  We can then log approvals,
welcome the new contributor to our team with suitable emoji, and grant
access all in one convenient place.

Infrastructure as Code allows our distributed team to easily maintain
our complex systems with a written record that we can refer back to.
The ability to defer changes to an asynchronous review is imperative
to manage the workflows of a distributed team.

## Good Lines of Communication

Of course, all the infrastructure in the world doesn't help if the
people using it can't effectively communicate.  To make sure this
issue doesn't occur for Void, we have multiple forms of communication
with different features.  For real-time discussions and even some
slower ones, we make use of IRC on Libera.chat.  Though many
communities appear to be moving away from synchronous text, we find
that it works well for us.  IRC is a great protocol that allows each
member of the team to connect using the interface that they believe is
the best for them, as well as to allow our automated systems to
connect in as well.

For conversations that need more time or are generally going to be
longer we make use of email or a group-scoped discussion on GitHub.
This allows for threaded messaging and a topic that can persist for
days or weeks if needed.  Maintaining a long running thread can help
us tease apart complicated issues or ensure everyone's voice is heard.
Long time users of Void may remember our forum, which has since been
supplanted by a subreddit and most recently GitHub Discussions.  These
threaded message boards are also examples of places that we converse
and exchange status information, but in a more social context.

For discussion that needs to pertain directly to our infrastructure,
we open tickets against the infrastructure repo.  This provides an
extremely clear place to report issues, discuss fixes, and collate
information relating to ongoing work.  It also allows us to leverage
GitHub's commit message parsing to automatically resolve a discussion
thread once a fix has been applied by closing the issue.  For really
large changes, we can also use GitHub projects, though in recent years
we have not made use of this particular organization system for
issues (we use tags).

No matter where we converse though, its always important to make sure
we converse clearly and concisely.  Void's team speaks a variety of
languages, though we mostly converse in English which is not known for
its intuitive clarity.  When making hazardous changes, we often push
changes to a central location and ask for explicit review of dangerous
parts, and call out clearly what the concerns are and what requires
review.  In this way we ensure that all of Void's various services
stay up, and our team members stay informed.

---

This post was authored by `maldridge` who runs most of the day to day
operations of the Void fleet.  On behalf of the entire Void team, I
hope you have enjoyed this week's dive into the infrastructure that
makes Void happen, and have learned some new things.  We're always
working to improve systems and make them easier to maintain or provide
more useful features, so if you want to contribute, join us in IRC.
Feel free to ask questions about this post or any of our others this
week on [GitHub
Discussions](https://github.com/void-linux/void-packages/discussions/45165)
or in [IRC](https://web.libera.chat/?nick=Guest?#voidlinux).
