import React, { useEffect, useState } from "react"
import TableTickets from "../../components/TableTickets/TableTickets"
import axios from "axios"

interface TableData {
  id: number
  name: string
  age: number
  email: string
}
interface ResponseUser {
  id: number
  firstname: string
  age: number
  email: string
}

const TicketsPage: React.FC = () => {
  const [users, setUsers] = useState<TableData[]>([])

  const getUser = async () => {
    const response = await axios.get(`https://jsonplaceholder.org/users`)
    const responseType = response.data.map((user: ResponseUser) => ({
      id: user.id,
      name: user.firstname,
      age: 12,
      email: user.email,
    }))
    setUsers(responseType)
  }
  useEffect(() => {
    getUser()
  },[])
  
  return (
    <div>
      <TableTickets data={users} />
    </div>
  )
}

export default TicketsPage
