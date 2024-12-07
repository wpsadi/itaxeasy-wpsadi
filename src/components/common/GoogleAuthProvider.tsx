import { GoogleOAuthProvider } from '@react-oauth/google';

export const EnableGoogleAuth = ({
    children
}:{
    children:React.ReactNode
})=>{
    return (<>
    <GoogleOAuthProvider clientId="913505404880-irsdftj3g4e8e9v47fqh5jbq6nonpj44.apps.googleusercontent.com">
        {children}
    </GoogleOAuthProvider>
    </>)
}