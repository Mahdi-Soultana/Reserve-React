import App from "next/app";
import Layout from '../components/_App/Layout';
import { parseCookies ,destroyCookie} from "nookies";
import { redirectUser } from "../utils/auth"
import baseUrl from '../utils/baseUrl'
import axios from "axios";
import Router from "next/router"
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {

    const { token } = parseCookies(ctx);
    let pageProps = {};
     
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    if (!token) {
      const isProtectedRoute = ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login")
      }
    }
    else {
      try {
        const payload = { headers: { Authorization: token } }
        const url = `${baseUrl}/api/account`
        const response = await axios.get(url, payload)
        const user = response.data;

        const isRoot=user.role==="root"
        const isAdmin=user.role==="admin"
        const isNotPermited=!(isAdmin || isRoot) && ctx.pathname==="/create"
        if(isNotPermited){
          redirectUser(ctx,"/")
        }
       // console.log(user)
        pageProps.user = user;
      } catch (error) {
        //console.error("Error getting Current User", error)
        destroyCookie(ctx,"token");
        redirectUser(ctx, "/login")
      }
    }

    return { pageProps }
  }
  componentDidMount(){
    console.log("logout from storge")
    window.addEventListener("storage",this.SyncLougOut)
  }
  SyncLougOut=event=>{
    if(event.key==="logout")
    Router.push("/login")
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp;
