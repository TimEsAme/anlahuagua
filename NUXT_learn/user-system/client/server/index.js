import { createServer } from '../server/createServer.js'
const port = 9527
const app = await createServer()

app.listen(port, () => {
  console.log(`编号${port} 周星星`)
})
