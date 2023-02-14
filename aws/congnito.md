# COGNITO

- Authentication, Authorization, User Management 

# User Pools
- Pozwalają na sign-up i sign-in i uzyskanie JWT (JSON Web Token)
- Można użyć extrnal identity providerów - FB, Gugel, Apel 
- Serwisy AWS nie rozumieją JWT, potrzebują kredek AWS
- JWT można użyć do autentykacji z API Gateway lub z systemami self-managed

# Identity Pool
- Pozwalają na uzyskanie tymczasowych AWS Kredek przez przyjęcie IAM Role
- Wymiana external identity na temp. kredki AWS
- Pozwala na guest access (unauthenticated identity)
- Możemy wymienić JWK na kredki AWS
- **EXAM** Wymiana External Identity na temp. kredki AWS to **Web Identity Federation**



