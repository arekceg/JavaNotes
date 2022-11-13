# S3 Pytania

1. An application allows a manufacturing site to upload files. Each uploaded 3 GB file is processed to extract metadata, and this process takes a few seconds per file. The frequency at which the uploads happen is unpredictable. For instance, there may be no updates for hours, followed by several files being uploaded concurrently.


What architecture addresses this workload in the most cost efficient manner?

A.  Use a Kinesis Data Delivery Stream to store the file. Use Lambda for processing.
B.  Use an SQS queue to store the file, to be accessed by a fleet of EC2Instances.
C.  Store the file in an EBS volume, which can then be accessed by another EC2 Instancefor processing.
D.  Store the file in an S3 bucket. Use Amazon S3 event notification to invoke aLambda function for file processing.

2.  A company is to run a service on AWS to provide offsite backups for images on laptops and phones.

The solution must support millions of customers with thousands of images per customer. Though the images will be retrieved infrequently, they must be available for retrieval immediately.

Which is the MOST cost efficient storage option that meets these requirements?

A.  Amazon Glacier with Expedited retrievals
B.  Amazon S3 Standard Infrequent Access
C.  Amazon EFS
D.  Amazon S3 Standard

3.  A Solutions Architect designing a solution to store and archive corporate documents, has determined Amazon Glacier as the right choice of solution.

An important requirement is that the data must be delivered within 10 minutes of a retrieval request.

Which feature in Amazon Glacier can help meet this requirement?

A.  Vault Lock
B.  Expedited retrieval
C.  Bulk retrieval
D.  Standard retrieval

4.  A Solutions Architect is designing a highly scalable system to track records. These records must remain available for immediate download for up to three months and then must be deleted.

What is the most appropriate decision for this use case?

A.  Store the files in Amazon EBS and create a Lifecycle Policy to remove files after 3 months
B.  Store the files in Amazon S3 and create a Lifecycle Policy to remove files after 3 months
C.  Store the files in Amazon Glacier and create a Lifecycle Policy to remove files after 3 months
D.  Store the files in Amazon EFS and create a Lifecycle Policy to remove files after 3 months

5. Development teams in your organization use S3 buckets to store log files for various applications hosted in AWS development environments. The developers intend to keep the logs for a month for troubleshooting purposes, and subsequently purge the logs.

What feature will enable this requirement?

A.  Adding a bucket policy on the S3 bucket.
B.  Configuring lifecycle configuration rules on the S3 bucket.
C.  Creatingan IAM policy for the S3 bucket.
D.  Enabling CORS on the S3 bucket.

6.  An application hosted in AWS allows users to upload videos to an S3 bucket. A user is required to be given access to upload some videos for a week based on the profile. How can be this be accomplished in the best way possible?

A.  Create an IAM bucket policy to provide access for a week’s duration.
B.  Create a pre-signed URL for each profile which will last for a week’s duration.
C.  Create an S3 bucket policy to provide access for a week’s duration.
D.  Create an IAM role to provide access for a week’s duration.

7. A company has a requirement for archival of 6TB of data. There is an agreement with the stakeholders for an 8-hour agreed retrieval time. Which of the following can be used as the MOST cost-effective storage option?

A.  AWS S3 Standard
B.  AWS S3 Infrequent Access
C.  AWS Glacier
D.  AWS EBS Volumes

8. A company is asking its developers to store application logs in an S3 bucket. These logs are only required for a temporary period of time after which, they can be deleted. Which of the following steps can be used to effectively manage this?

A.  Create a cron job to detect the stale logs and delete them accordingly.
B.  Use a bucket policy to manage the deletion.
C.  Usean IAM Policy to manage the deletion.
D.  Use S3 Lifecycle Policies to manage the deletion.

9. A company has an application that stores images and thumbnails for images on S3. While the thumbnail images need to be available for download immediately, the images and thumbnails themselves are not accessed that frequently.

Which is the most cost-efficient storage option to store images that meet these requirements?

A.  Amazon Glacier with Expedited Retrievals.
B.  Amazon S3 Standard Infrequent Access
C.  Amazon EFS
D.  Amazon S3 Standard

10. You have an application hosted on AWS that writes images to an S3 bucket. The concurrent number of users on the application is expected to reach around 10,000 with approximately 500 reads and writes expected per second. How should the architect maximize Amazon S3 performance?

A.  Prefix each object name with a random string.
B.  Use the STANDARD_IA storage class.
C.  Prefix each object name with the current data.
D.  Enable versioning on the S3 bucket.

11. A company has a sales team and each member of this team uploads their sales figures daily. A Solutions Architect needs a durable storage solution for these documents and also a way to prevent users from accidentally deleting important documents. What among the following choices would deliver protection against unintended user actions?

A.  Store data in an EBS Volume and create snapshots once a week.
B.  Store data in an S3 bucket and enable versioning.
C.  Store data in two S3 buckets in different AWS regions.
D.  Store data on EC2 Instance storage.

12. A company has an application that delivers objects from S3 to users. Of late, some users spread across the globe have been complaining of slow response times. Which of the following additional steps would help in building a cost-effective solution and also help ensure that the users get an optimal response to objects from S3?

A.  Use S3 Replication to replicate the objects to regions closest to the users.
B.  Ensure S3 Transfer Acceleration is enabled to ensure all users get the desiredresponse times.
C.  Place an ELB in front of S3 to distribute the load across S3.
D.  Placethe S3 bucket behind a CloudFront distribution.

13. A company stores its log data in an S3 bucket. There is a current need to have search capabilities available for the data in S3. How can this be achieved in an efficient and ongoing manner? Choose 2 answers from the options below. Each answer forms a part of the solution.

A.  Use an AWS Lambda function which gets triggered whenever data is added to the S3bucket.
B.  Create a Lifecycle Policy for the S3 bucket.
C.  Load the data into Amazon Elasticsearch.
D.  Load the data into Glacier.

14. You work for a company that stores records for a minimum of 10 years. Most of these records will never be accessed but must be made available upon request (within a few hours). What is the most cost-effective storage option in this scenario? Choose the correct answer from the options below.

A.  Simple Storage Service
B.  EBS Volumes
C.  Glacier
D.  AWS Import/Export

15. Your company has a requirement to host a static web site in AWS. Which of the following steps would help implement a quick and cost-effective solution for this requirement? Choose 2 answers from the options given below. Each answer forms a part of the solution.

A. Uploadthe static content to an S3 bucket.
B. Createan EC2 Instance and install a web server.
C. Enableweb site hosting for the S3 bucket.
D. Uploadthe code to the web server on the EC2 Instance.

16. A company currently storing a set of documents in the AWS Simple Storage Service, is worried about the potential loss if these documents are ever deleted. Which of the following can be used to ensure protection from loss of the underlying documents in S3?

A. Enable Versioning for the underlying S3 bucket.
B. Copythe bucket data to an EBS Volume as a backup.
C. Createa Snapshot of the S3 bucket.
D. Enablean IAM Policy which does not allow deletion of any document from the S3 bucket.

17. Your company has confidential documents stored in the Simple Storage Service. Due to compliance requirements, there is a need for the data in the S3 bucket to be available in a different geographical location. As an architect, what change would you make to comply with this requirement?

A. Apply Multi-AZ for the underlying S3 bucket.
B. Copy the data to an EBS Volume in another region.
C. Create a snapshot of the S3 bucket and copy it to another region.
D. Enable Cross-Region Replication for the S3 bucket.

18. A company wants to store their documents in AWS. Initially, these documents will be used frequently, and after a duration of 6 months, they will need to be archived. How would you architect this requirement?

A. Store the files in Amazon EBS and create a Lifecycle Policy to remove the files after 6 months.
B. Store the files in Amazon S3 and create a Lifecycle Policy to archive the files after 6 months.
C. Store the files in Amazon Glacier and create a Lifecycle Policy to remove the filesafter 6 months.
D. Store the files in Amazon EFS and create a Lifecycle Policy to remove the files after 6 months.

19. A company hosts data in S3. There is now a mandate that going forward, all data in the S3 bucket needs to be encrypted at rest. How can this be achieved?

A. Use AWS Access Keys to encrypt the data.
B. Use SSL Certificates to encrypt the data.
C. Enable Server-side encryption on the S3 bucket.
D. Enable MFA on the S3 bucket.

20. A company hosts data in S3. There is a requirement to control access to the S3 buckets. Which are the 2 ways in which this can be achieved?

A. Use Bucket Policies.
B. Use the Secure Token Service.
C. Use IAM user policies.
D. Use AWS Access Keys.

21. Your IT Supervisor is worried about users accidentally deleting objects in an S3 bucket. Which of the following can help prevent accidental deletion of objects in an S3 bucket? Choose 2 answers from the options given below.

A. Enable encryption for the S3 bucket.
B. Enable MFA Delete on the S3 bucket.
C. Enable Versioning on the S3 bucket.
D. Enable IAM Roles on the S3 bucket.






























---------------------------------------------
1.  D. Store the file in an S3 bucket. Use Amazon S3 event notification to invoke aLambda function for file processing.

You can first create a Lambda function with the code to process the file.
You can then use an Event Notification from the S3 bucket to invoke the Lambda function whenever a file is uploaded.
For more information on Amazon S3 event notification, please visit the following URL:
https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html
Option A is incorrect. Kinesis is used to collect, process and analyze real time data.
The frequency of updates are quite unpredictable. By default SQS uses short polling. In this case, it will lead to the cost factor going up since we are getting messages in an unpredictable manner and many a times it will be returning empty responses. Hence option B is not a solution.

2.  B. Amazon S3 Standard Infrequent Access

Amazon S3 Infrequent Access is perfect if you want to store data that need not be frequently accessed. It is must more cost effective than Amazon S3 Standard (Option D). And if you choose Amazon Glacier with expedited retrievals, then you defeat the whole purpose of the requirement, because you would have an increased cost with this option.

For more information on AWS Storage classes, please visit the following URL:

https://aws.amazon.com/s3/storage-classes/

3.  B. Expedited retrieval

AWS Documentation mentions the following:

Expedited retrievals to access data in 1 – 5 minutes for a flat rate of $0.03 per GB retrieved. Expedited retrievals allow you to quickly access your data when occasional urgent requests for a subset of archives are required.

For more information on AWS Glacier Retrieval, please visit the following URL:

https://docs.aws.amazon.com/amazonglacier/latest/dev/downloading-an-archive-two-steps.html
The other two are standard ( 3-5 hours retrieval time) and Bulk retrievals which is the cheapest option.(5-12 hours retrieval time)

4.  B. Store the files in Amazon S3 and create a Lifecycle Policy to remove files after 3 months.

Option A is invalid, since the records need to be stored in a highly scalable system.

Option C is invalid, since the records must be available for immediate download.

Option D is invalid, because it does not have the concept of a Lifecycle Policy.

AWS Documentation mentions the following on Lifecycle Policies:

Lifecycle configuration enables you to specify the Lifecycle Management of objects in a bucket. The configuration is a set of one or more rules, where each rule defines an action for Amazon S3 to apply to a group of objects. These actions can be classified as follows:

Transition actions – In which you define when the objects transition to another storage class. For example, you may choose to transition objects to the STANDARD_IA (IA, for infrequent access) storage class 30 days after creation, or archive objects to the GLACIER storage class one year after creation.

Expiration actions – In which you specify when the objects expire. Then Amazon S3 deletes the expired objects on your behalf.

For more information on AWS S3 Lifecycle Policies, please visit the following URL:

https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html

5. B. Configuring lifecycle configuration rules on the S3 bucket.

6. B. Create a pre-signed URL for each profile which will last for a week’s duration.

Pre-signed URL’s are the perfect solution when you want to give temporary access to users for S3 buckets. So, whenever a new profile is created, you can create a pre-signed URL to ensure that the URL lasts for a week and allows users to upload the required objects.

For more information on pre-signed URL’s, please visit the following URL:

https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html

7.  C. AWS Glacier

Amazon Glacier is the perfect solution for this. Since the agreed time frame for retrieval is met at 8 hours, this will be the most cost effective option.

For more information on AWS Glacier, please visit the following URL:

https://aws.amazon.com/documentation/glacier/

8. D. UseS3 Lifecycle Policies to manage the deletion.

9.  B. Amazon S3 Standard Infrequent Access

Amazon S3 Infrequent access is perfect if you want to store data that is not frequently accessed. It is more cost effective than Option D (Amazon S3 Standard). If you choose Amazon Glacier with Expedited Retrievals, you defeat the whole purpose of the requirement, because of its increased cost.

10.  A. Prefix each object name with a random string.

If the request rate is high, you can use hash keys or random strings to prefix the object name. In such a case, the partitions used to store the objects will be better distributed and hence allow for better read/write performance for your objects.

For more information on how to ensure performance in S3, please visit the following URL:

https://docs.aws.amazon.com/AmazonS3/latest/dev/request-rate-perf-considerations.html
STANDARD_IA storage class is for infrequent data access. Option C is not a good solution. Versioning does not make any difference to the performance in this case.

11. B

12.  D. Place the S3 bucket behind a CloudFront distribution.

AWS Documentation mentions the following:

If your workload is mainly sending GET requests, in addition to the preceding guidelines, you should consider using Amazon CloudFront for performance optimization.

Integrating Amazon CloudFront with Amazon S3, you can distribute content to your users with low latency and a high data transfer rate. You will also send fewer direct requests to Amazon S3, which will reduce your costs.

For example, suppose that you have a few objects that are very popular. Amazon CloudFront fetches those objects from Amazon S3 and caches them. Amazon CloudFront can then serve future requests for the objects from its cache, reducing the number of GET requests it sends to Amazon S3.

For more information on performance considerations in S3, please visit the following URL:

https://docs.aws.amazon.com/AmazonS3/latest/dev/request-rate-perf-considerations.html
Options A and B are incorrect. S3 Cross-Region Replication and Transfer Acceleration incurs cost.

Option C is incorrect. ELB is used to distribute traffic on to EC2 Instances.

13.  A & C

AWS Elasticsearch provides full search capabilities and can be used for log files stored in the S3 bucket.

AWS Documentation mentions the following with regard to the integration of Elasticsearch with S3:

You can integrate your Amazon ES domain with Amazon S3 and AWS Lambda. Any new data sent to an S3 bucket triggers an event notification to Lambda, which then runs your custom Java or Node.js application code. After your application processes the data, it streams the data to your domain.

For more information on integration between Elasticsearch and S3, please visit the following URL:

https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-aws-integrations.html

14. C. Glacier
15. A & C 
16. A. Enable Versioning for the underlying S3 bucket.
17. D. EnableCross-Region Replication for the S3 bucket.

This is mentioned clearly as a use case for S3 Cross-Region Replication.

You might configure Cross-Region Replication on a bucket for various reasons, including the following:

Compliance requirements – Although, by default, Amazon S3 stores your data across multiple geographically distant Availability Zones, compliance requirements might dictate that you store data at even further distances. Cross-region replication allows you to replicate data between distant AWS Regions to satisfy these compliance requirements.
For more information on S3 Cross-Region Replication, please visit the following URL:

https://docs.aws.amazon.com/AmazonS3/latest/dev/crr.html

18. B. Store the files in Amazon S3 and create a Lifecycle Policy to archive the files after 6 months.

19. C. EnableServer-side encryption on the S3 bucket.
20. A. & C. 
21. B. & C.
