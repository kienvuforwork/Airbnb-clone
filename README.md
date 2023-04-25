# Airbnb-clone

## Technology and library used 
- React
- Nextjs 13
- Typescript
- Tailwindcss
- Redux with redux toolkit
- react-hook-form
- Next-auth
- Prisma with mongodb


## Explain some architecture concepts and how technologies in this project work.
1. How i used redux and redux toolkit with Nextjs

 In common react application we can wrap the entire app with Provider from react-redux but with Nextjs 13 we have to deal with things called client component and
 server component. By default my entire application is in the layout.tsx which by default should be a server component while the redux and others state management library
 is client component. So to use the Provider in the layout.tsx we have to convert that to client component which is break the Nextjs concept.
 
 Solution: I created a new ReduxProvider used client side and wrap the application with that provider.


2. React-hook-form
  - register: we can use this from useForm to register a input field in order to make react-hook-form control this field
  - errors: when ever a field is not satisfied react-hook-form will provide us with error[name], name is the label of the field or we can use the id
  - handleSubmit: we can pass a fucntion to that handleSubmit funciton to process the form data which is automatically passed in by handleSubmit. In this case i used 
  onSubmit which is a type of SubmitHandler
 
3. How i used Prisma and mongodb (Prisma is an Object-Relational Mapping (ORM) tool) 

- Connect pirsma to mongodb we need to give the prisma the url of our database and also provide the username and password
- Create models in schema.prisma file and push it so mongodb can create those models. 
- Create prismadb.ts in libs folder to create a client in order to talk to mongoDb through prisma.

4. How i used next auth

 - We have to structure the next-auth in pages\api\auth\[..nextauth].ts
 - Provide the adpater with PrismaAdapter and pass in the client
 - Create GooglePorvider, FaceBookProvider and CreadentialsProvider
 - If user login success we return an user object in CredentialProvider so Next auth can genarate a session based on that object
 - We can get that session any where in our app and it is a server component job. we do not have to call any api
 
 

  
