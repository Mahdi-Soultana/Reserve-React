const basedUrl=
process.env.NODE_ENV==="production"
?"http//depoyment-url.now.sh"
:"http://localhost:3000";

export default basedUrl;