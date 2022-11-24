1. You have a business-to-business web application running in a VPC consisting of an Elastic Load Balancer (ELB), web servers, application servers and a database. Your web application should only accept traffic from predefined customer IP addresses. Which two options meet this security requirement? Choose 2 answers
    A. Configure web server VPC security groups to allow traffic from your customers’ IPs 
    B. Configure your web servers to filter traffic based on the ELB’s “X-forwarded-for” header 
    C. Configure ELB security groups to allow traffic from your customers’ IPs and deny all outbound traffic 
    D. Configure a VPC NACL to allow web traffic from your customers’ IPs and deny all outbound traffic 

2. A user has created a VPC with public and private subnets using the VPC Wizard. The VPC has CIDR 20.0.0.0/16. The private subnet uses CIDR 20.0.0.0/24. Which of the below mentioned entries are required in the main route table to allow the instances in VPC to communicate with each other?
    A. Destination : 20.0.0.0/24 and Target : VPC
    B. Destination : 20.0.0.0/16 and Target : ALL
    C. Destination : 20.0.0.0/0 and Target : ALL
    D. Destination : 20.0.0.0/16 and Target : Local

3. A user has created a VPC with two subnets: one public and one private. The user is planning to run the patch update for the instances in the private subnet. How can the instances in the private subnet connect to the internet?
    A. Use the internet gateway with a private IP
    B. Allow outbound traffic in the security group for port 80 to allow internet updates
    C. The private subnet can never connect to the internet
    D. Use NAT with an elastic IP

4. A user has launched an EC2 instance and installed a website with the Apache webserver. The webserver is running but the user is not able to access the website from the Internet. What can be the possible reason for this failure?
    A. The security group of the instance is not configured properly.
    B. The instance is not configured with the proper key-pairs.
    C. The Apache website cannot be accessed from the Internet.
    D. Instance is not configured with an elastic IP.
5. A user has created a VPC with public and private subnets using the VPC wizard. Which of the below mentioned statements is true in this scenario?
    A. AWS VPC will automatically create a NAT instance with the micro size
    B. VPC bounds the main route table with a private subnet and a custom route table with a public subnet
    C. User has to manually create a NAT instance
    D. VPC bounds the main route table with a public subnet and a custom route table with a private subnet

6. A user has created a VPC with public and private subnets. The VPC has CIDR 20.0.0.0/16. The private subnet uses CIDR 20.0.1.0/24 and the public subnet uses CIDR 20.0.0.0/24. The user is planning to host a web server in the public subnet (port 80) and a DB server in the private subnet (port 3306). The user is configuring a security group of the NAT instance. Which of the below mentioned entries is not required for the NAT security group?
    A. For Inbound allow Source: 20.0.1.0/24 on port 80
    B. For Outbound allow Destination: 0.0.0.0/0 on port 80
    C. For Inbound allow Source: 20.0.0.0/24 on port 80
    D. For Outbound allow Destination: 0.0.0.0/0 on port 443

7. A user has created a VPC with CIDR 20.0.0.0/24. The user has used all the IPs of CIDR and wants to increase the size of the VPC. The user has two subnets: public (20.0.0.0/25) and private (20.0.0.128/25). How can the user change the size of the VPC?
    A. The user can delete all the instances of the subnet. Change the size of the subnets to 20.0.0.0/32 and 20.0.1.0/32, respectively. Then the user can increase the size of the VPC using CLI
    B. It is not possible to change the size of the VPC once it has been created
    C. User can add a subnet with a higher range so that it will automatically increase the size of the VPC
    D. User can delete the subnets first and then modify the size of the VPC

8. A user has created a VPC with the public and private subnets using the VPC wizard. The VPC has CIDR 20.0.0.0/16. The public subnet uses CIDR 20.0.1.0/24. The user is planning to host a web server in the public subnet (port 80) and a DB server in the private subnet (port 3306). The user is configuring a security group for the public subnet (WebSecGrp) and the private subnet (DBSecGrp). Which of the below mentioned entries is required in the web server security group (WebSecGrp)?
    A. Configure Destination as DB Security group ID (DbSecGrp) for port 3306 Outbound
    B. Configure port 80 for Destination 0.0.0.0/0 Outbound
    C. Configure port 3306 for source 20.0.0.0/24 InBound
    D. Configure port 80 InBound for source 20.0.0.0/16

9. A user has created a VPC with CIDR 20.0.0.0/16. The user has created one subnet with CIDR 20.0.0.0/16 by mistake. The user is trying to create another subnet of CIDR 20.0.0.1/24. How can the user create the second subnet?
    A. There is no need to update the subnet as VPC automatically adjusts the CIDR of the first subnet based on the second subnet’s CIDR
    B. The user can modify the first subnet CIDR from the console
    C. It is not possible to create a second subnet as one subnet with the same CIDR as the VPC has been created
    D. The user can modify the first subnet CIDR with AWS CLI

10. A user has setup a VPC with CIDR 20.0.0.0/16. The VPC has a private subnet (20.0.1.0/24) and a public subnet (20.0.0.0/24). The user’s data centre has CIDR of 20.0.54.0/24 and 20.1.0.0/24. If the private subnet wants to communicate with the data centre, what will happen?
    A. It will allow traffic communication on both the CIDRs of the data centre
    B. It will not allow traffic with data centre on CIDR 20.1.0.0/24 but allows traffic communication on 20.0.54.0/24
    C. It will not allow traffic communication on any of the data centre CIDRs
    D. It will allow traffic with data centre on CIDR 20.1.0.0/24 but does not allow on 20.0.54.0/24 (as the CIDR block would be overlapping)

11. A user has created a VPC with public and private subnets using the VPC wizard. The VPC has CIDR 20.0.0.0/16. The private subnet uses CIDR 20.0.0.0/24 . The NAT instance ID is i-a12345. Which of the below mentioned entries are required in the main route table attached with the private subnet to allow instances to connect with the internet?
    Destination: 0.0.0.0/0 and Target: i-a12345
    Destination: 20.0.0.0/0 and Target: 80
    Destination: 20.0.0.0/0 and Target: i-a12345
    Destination: 20.0.0.0/24 and Target: i-a12345

12. A user has created a VPC with CIDR 20.0.0.0/16 using the wizard. The user has created a public subnet CIDR (20.0.0.0/24) and VPN only subnets CIDR (20.0.1.0/24) along with the VPN gateway (vgw-12345) to connect to the user’s data centre. The user’s data centre has CIDR 172.28.0.0/12. The user has also setup a NAT instance (i-123456) to allow traffic to the internet from the VPN subnet. Which of the below mentioned options is not a valid entry for the main route table in this scenario?
    Destination: 20.0.1.0/24 and Target: i-12345
    Destination: 0.0.0.0/0 and Target: i-12345
    Destination: 172.28.0.0/12 and Target: vgw-12345
    Destination: 20.0.0.0/16 and Target: local

13. A user has created a VPC with CIDR 20.0.0.0/16. The user has created one subnet with CIDR 20.0.0.0/16 in this VPC. The user is trying to create another subnet with the same VPC for CIDR 20.0.0.1/24. What will happen in this scenario?
    The VPC will modify the first subnet CIDR automatically to allow the second subnet IP range
    It is not possible to create a subnet with the same CIDR as VPC
    The second subnet will be created
    It will throw a CIDR overlaps error

14. A user has created a VPC with CIDR 20.0.0.0/16 using the wizard. The user has created both Public and VPN-Only subnets along with hardware VPN access to connect to the user’s data centre. The user has not yet launched any instance as well as modified or deleted any setup. He wants to delete this VPC from the console. Will the console allow the user to delete the VPC?
    Yes, the console will delete all the setups and also delete the virtual private gateway
    No, the console will ask the user to manually detach the virtual private gateway first and then allow deleting the VPC
    Yes, the console will delete all the setups and detach the virtual private gateway
    No, since the NAT instance is running

15. A user has created a VPC with the public and private subnets using the VPC wizard. The VPC has CIDR 20.0.0.0/16. The public subnet uses CIDR 20.0.1.0/24. The user is planning to host a web server in the public subnet (port 80) and a DB server in the private subnet (port 3306). The user is configuring a security group for the public subnet (WebSecGrp) and the private subnet (DBSecGrp). Which of the below mentioned entries is required in the private subnet database security group (DBSecGrp)?
    Allow Inbound on port 3306 for Source Web Server Security Group (WebSecGrp)
    Allow Inbound on port 3306 from source 20.0.0.0/16
    Allow Outbound on port 3306 for Destination Web Server Security Group (WebSecGrp.
    Allow Outbound on port 80 for Destination NAT Instance IP

16. A user has created a VPC with a subnet and a security group. The user has launched an instance in that subnet and attached a public IP. The user is still unable to connect to the instance. The internet gateway has also been created. What can be the reason for the error?
    The internet gateway is not configured with the route table
    The private IP is not present
    The outbound traffic on the security group is disabled
    The internet gateway is not configured with the security group

17. A user has created a subnet in VPC and launched an EC2 instance within it. The user has not selected the option to assign the IP address while launching the instance. Which of the below mentioned statements is true with respect to the Instance requiring access to the Internet?
    The instance will always have a public DNS attached to the instance by default
    The user can directly attach an elastic IP to the instance
    The instance will never launch if the public IP is not assigned
    The user would need to create an internet gateway and then attach an elastic IP to the instance to connect from internet

18. A user has created a VPC with public and private subnets using the VPC wizard. Which of the below mentioned statements is not true in this scenario?
    VPC will create a routing instance and attach it with a public subnet
    VPC will create two subnets
    VPC will create one internet gateway and attach it to VPC
    VPC will launch one NAT instance with an elastic IP

19. A user has created a VPC with the public subnet. The user has created a security group for that VPC. Which of the below mentioned statements is true when a security group is created?
    It can connect to the AWS services, such as S3 and RDS by default
    It will have all the inbound traffic by default
    It will have all the outbound traffic by default
    It will by default allow traffic to the internet gateway

20. A user has created a VPC with CIDR 20.0.0.0/16 using VPC Wizard. The user has created a public CIDR (20.0.0.0/24) and a VPN only subnet CIDR (20.0.1.0/24) along with the hardware VPN access to connect to the user’s data centre. Which of the below mentioned components is not present when the VPC is setup with the wizard?
    Main route table attached with a VPN only subnet
    A NAT instance configured to allow the VPN subnet instances to connect with the internet
    Custom route table attached with a public subnet
    An internet gateway for a public subnet

A user has created a VPC with public and private subnets using the VPC wizard. The user has not launched any instance manually and is trying to delete the VPC. What will happen in this scenario?
    It will not allow to delete the VPC as it has subnets with route tables
    It will not allow to delete the VPC since it has a running route instance
    It will terminate the VPC along with all the instances launched by the wizard
    It will not allow to delete the VPC since it has a running NAT instance
A user has created a public subnet with VPC and launched an EC2 instance within it. The user is trying to delete the subnet. What will happen in this scenario?
    It will delete the subnet and make the EC2 instance as a part of the default subnet
    It will not allow the user to delete the subnet until the instances are terminated
    It will delete the subnet as well as terminate the instances
    Subnet can never be deleted independently, but the user has to delete the VPC first
A user has created a VPC with CIDR 20.0.0.0/24. The user has created a public subnet with CIDR 20.0.0.0/25 and a private subnet with CIDR 20.0.0.128/25. The user has launched one instance each in the private and public subnets. Which of the below mentioned options cannot be the correct IP address (private IP) assigned to an instance in the public or private subnet?
    20.0.0.255
    20.0.0.132
    20.0.0.122
    20.0.0.55
A user has created a VPC with CIDR 20.0.0.0/16. The user has created public and VPN only subnets along with hardware VPN access to connect to the user’s datacenter. The user wants to make so that all traffic coming to the public subnet follows the organization’s proxy policy. How can the user make this happen?
    Setting up a NAT with the proxy protocol and configure that the public subnet receives traffic from NAT
    Setting up a proxy policy in the internet gateway connected with the public subnet
    It is not possible to setup the proxy policy for a public subnet
    Setting the route table and security group of the public subnet which receives traffic from a virtual private gateway
A user has created a VPC with CIDR 20.0.0.0/16 using the wizard. The user has created a public subnet CIDR (20.0.0.0/24) and VPN only subnets CIDR (20.0.1.0/24) along with the VPN gateway (vgw-12345) to connect to the user’s data centre. Which of the below mentioned options is a valid entry for the main route table in this scenario?
    Destination: 20.0.0.0/24 and Target: vgw-12345
    Destination: 20.0.0.0/16 and Target: ALL
    Destination: 20.0.1.0/16 and Target: vgw-12345
    Destination: 0.0.0.0/0 and Target: vgw-12345
Which two components provide connectivity with external networks? When attached to an Amazon VPC which two components provide connectivity with external networks? Choose 2 answers
    Elastic IPs (EIP) (Does not provide connectivity, public IP address will do as well)
    NAT Gateway (NAT) (Not Attached to VPC and still needs IGW)
    Internet Gateway (IGW)
    Virtual Private Gateway (VGW)
You are attempting to connect to an instance in Amazon VPC without success You have already verified that the VPC has an Internet Gateway (IGW) the instance has an associated Elastic IP (EIP) and correct security group rules are in place. Which VPC component should you evaluate next?
    The configuration of a NAT instance
    The configuration of the Routing Table
    The configuration of the internet Gateway (IGW)
    The configuration of SRC/DST checking
If you want to launch Amazon Elastic Compute Cloud (EC2) Instances and assign each Instance a predetermined private IP address you should:
    Assign a group or sequential Elastic IP address to the instances
    Launch the instances in a Placement Group
    Launch the instances in the Amazon virtual Private Cloud (VPC)
    Use standard EC2 instances since each instance gets a private Domain Name Service (DNS) already
    Launch the Instance from a private Amazon Machine image (AMI)
A user has recently started using EC2. The user launched one EC2 instance in the default subnet in EC2-VPC Which of the below mentioned options is not attached or available with the EC2 instance when it is launched?
    Public IP address
    Internet gateway
    Elastic IP
    Private IP address
A user has created a VPC with CIDR 20.0.0.0/24. The user has created a public subnet with CIDR 20.0.0.0/25. The user is trying to create the private subnet with CIDR 20.0.0.128/25. Which of the below mentioned statements is true in this scenario?
    It will not allow the user to create the private subnet due to a CIDR overlap
    It will allow the user to create a private subnet with CIDR as 20.0.0.128/25
    This statement is wrong as AWS does not allow CIDR 20.0.0.0/25
    It will not allow the user to create a private subnet due to a wrong CIDR range
A user has created a VPC with CIDR 20.0.0.0/16 with only a private subnet and VPN connection using the VPC wizard. The user wants to connect to the instance in a private subnet over SSH. How should the user define the security rule for SSH?
    Allow Inbound traffic on port 22 from the user’s network
    The user has to create an instance in EC2 Classic with an elastic IP and configure the security group of a private subnet to allow SSH from that elastic IP
    The user can connect to a instance in a private subnet using the NAT instance
    Allow Inbound traffic on port 80 and 22 to allow the user to connect to a private subnet over the Internet
A company wants to implement their website in a virtual private cloud (VPC). The web tier will use an Auto Scaling group across multiple Availability Zones (AZs). The database will use Multi-AZ RDS MySQL and should not be publicly accessible. What is the minimum number of subnets that need to be configured in the VPC?
    1
    2
    3
    4 
Which of the following are characteristics of Amazon VPC subnets? Choose 2 answers
    Each subnet maps to a single Availability Zone
    A CIDR block mask of /25 is the smallest range supported
    Instances in a private subnet can communicate with the Internet only if they have an Elastic IP.
    By default, all subnets can route between each other, whether they are private or public
    Each subnet spans at least 2 Availability zones to provide a high-availability environment
You need to design a VPC for a web-application consisting of an Elastic Load Balancer (ELB). a fleet of web/application servers, and an RDS database The entire Infrastructure must be distributed over 2 availability zones. Which VPC configuration works while assuring the database is not available from the Internet?
    One public subnet for ELB one public subnet for the web-servers, and one private subnet for the database
    One public subnet for ELB two private subnets for the web-servers, two private subnets for RDS
    Two public subnets for ELB two private subnets for the web-servers and two private subnets for RDS
    Two public subnets for ELB two public subnets for the web-servers, and two public subnets for RDS
You have deployed a three-tier web application in a VPC with a CIDR block of 10.0.0.0/28. You initially deploy two web servers, two application servers, two database servers and one NAT instance tor a total of seven EC2 instances The web. Application and database servers are deployed across two availability zones (AZs). You also deploy an ELB in front of the two web servers, and use Route53 for DNS Web (raffle gradually increases in the first few days following the deployment, so you attempt to double the number of instances in each tier of the application to handle the new load unfortunately some of these new instances fail to launch. Which of the following could the root caused? (Choose 2 answers) [PROFESSIONAL]
    The Internet Gateway (IGW) of your VPC has scaled-up adding more instances to handle the traffic spike, reducing the number of available private IP addresses for new instance launches.
    AWS reserves one IP address in each subnet’s CIDR block for Route53 so you do not have enough addresses left to launch all of the new EC2 instances.
    AWS reserves the first and the last private IP address in each subnet’s CIDR block so you do not have enough addresses left to launch all of the new EC2 instances.
    The ELB has scaled-up. Adding more instances to handle the traffic reducing the number of available private IP addresses for new instance launches
    AWS reserves the first four and the last IP address in each subnet’s CIDR block so you do not have enough addresses left to launch all of the new EC2 instances.
A user wants to access RDS from an EC2 instance using IP addresses. Both RDS and EC2 are in the same region, but different AZs. Which of the below mentioned options help configure that the instance is accessed faster?
    Configure the Private IP of the Instance in RDS security group (Recommended as the data is transferred within the the Amazon network and not through internet – Refer link)
    Security group of EC2 allowed in the RDS security group
    Configuring the elastic IP of the instance in RDS security group
    Configure the Public IP of the instance in RDS security group
In regards to VPC, select the correct statement:
    You can associate multiple subnets with the same Route Table.
    You can associate multiple subnets with the same Route Table, but you can’t associate a subnet with only one Route Table.
    You can’t associate multiple subnets with the same Route Table.
    None of these.
You need to design a VPC for a web-application consisting of an ELB a fleet of web application servers, and an RDS DB. The entire infrastructure must be distributed over 2 AZ. Which VPC configuration works while assuring the DB is not available from the Internet?
    One Public Subnet for ELB, one Public Subnet for the web-servers, and one private subnet for the DB
    One Public Subnet for ELB, two Private Subnets for the web-servers, and two private subnets for the RDS
    Two Public Subnets for ELB, two private Subnet for the web-servers, and two private subnet for the RDS
    Two Public Subnets for ELB, two Public Subnet for the web-servers, and two public subnets for the RDS
You have an Amazon VPC with one private subnet and one public subnet with a Network Address Translator (NAT) server. You are creating a group of Amazon Elastic Cloud Compute (EC2) instances that configure themselves at startup via downloading a bootstrapping script from Amazon Simple Storage Service (S3) that deploys an application via GIT. Which setup provides the highest level of security?
    Amazon EC2 instances in private subnet, no EIPs, route outgoing traffic via the NAT
    Amazon EC2 instances in public subnet, no EIPs, route outgoing traffic via the Internet Gateway (IGW)
    Amazon EC2 instances in private subnet, assign EIPs, route outgoing traffic via the Internet Gateway (IGW)
    Amazon EC2 instances in public subnet, assign EIPs, route outgoing traffic via the NAT
You have launched an Amazon Elastic Compute Cloud (EC2) instance into a public subnet with a primary private IP address assigned, an internet gateway is attached to the VPC, and the public route table is configured to send all Internet-based traffic to the Internet gateway. The instance security group is set to allow all outbound traffic but cannot access the Internet. Why is the Internet unreachable from this instance?
    The instance does not have a public IP address
    The Internet gateway security group must allow all outbound traffic.
    The instance security group must allow all inbound traffic.
    The instance “Source/Destination check” property must be enabled.
You have an environment that consists of a public subnet using Amazon VPC and 3 instances that are running in this subnet. These three instances can successfully communicate with other hosts on the Internet. You launch a fourth instance in the same subnet, using the same AMI and security group configuration you used for the others, but find that this instance cannot be accessed from the internet. What should you do to enable Internet access?
    Deploy a NAT instance into the public subnet.
    Assign an Elastic IP address to the fourth instance
    Configure a publically routable IP Address in the host OS of the fourth instance.
    Modify the routing table for the public subnet.
You have a load balancer configured for VPC, and all back-end Amazon EC2 instances are in service. However, your web browser times out when connecting to the load balancer’s DNS name. Which options are probable causes of this behavior? Choose 2 answers
    The load balancer was not configured to use a public subnet with an Internet gateway configured
    The Amazon EC2 instances do not have a dynamically allocated private IP address
    The security groups or network ACLs are not property configured for web traffic.
    The load balancer is not configured in a private subnet with a NAT instance.
    The VPC does not have a VGW configured.
When will you incur costs with an Elastic IP address (EIP)?
    When an EIP is allocated.
    When it is allocated and associated with a running instance.
    When it is allocated and associated with a stopped instance.
    Costs are incurred regardless of whether the EIP is associated with a running instance.








-------------------------------------
1. B i C o  
    A. Web server is behind the ELB and customer IPs will never reach web servers
    B. Get the customer IPs and create a custom filter to restrict access
    C. ELB will see the customer IPs so can restrict access, deny all is basically have no rules in outbound traffic, implicit, and its stateful so would work
    D. Configure a VPC NACL to allow web traffic from your customers’ IPs and deny all outbound traffic (NACL is stateless, deny all will not work)
2. D
3. D
4. A
5. B
6. C 
7. B
8. A
9. C
10. D
11. A
12. A
13. D
14. C
15. A.
16. A
17. D
18. A
19. C
20. B
