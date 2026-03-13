import { useState } from "react"
import { Button } from "@/components/ui/button"
// 1. Tambahkan import type dari folder 'shared'
import type { ApiResponse, HealthCheck } from "shared"

function App() {
  const [response, setResponse] = useState<string>("")

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3000")
      // 2. Ubah cara membaca data: dari res.text() menjadi res.json()
      //    serta berikan tipe data agar TypeScript tahu bentuk objeknya
      const data: ApiResponse<HealthCheck> = await res.json()

      // 3. Ambil nilai 'status' ("ok") dari dalam objek bersarang tersebut
      setResponse(data.data.status)
    } catch (error) {
      console.error(error)
      setResponse("Error connecting to server")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      
      <Button onClick={handleClick}>
        Get Response
      </Button>

      <div className="p-4 border rounded w-96">
        <b>Server Response:</b>
        <p>{response}</p>
      </div>

    </div>
  )
}

export default App