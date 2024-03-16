import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import Card from "@mui/material/Card"

import {
  Button,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material"
import { FC, useState } from "react"
interface TableData {
  id: number
  name: string
  age: number
  email: string
}

interface TableProps {
  data: TableData[]
}

const TableTickets: FC<TableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableData
    direction: "ascending" | "descending"
  } | null>(null)

  const handleSort = (key: keyof TableData) => {
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: "ascending" })
    } else {
      setSortConfig((prevConfig) => ({
        key,
        direction:
          prevConfig?.direction === "ascending" ? "descending" : "ascending",
      }))
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset pagination when search term changes
  }

  const handleEdit = (id: number) => {
    alert(`Editing row with ID: ${id}`)
  }

  const handleDelete = (id: number) => {
    alert(`Deleting row with ID: ${id}`)
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const sortedData = sortConfig
    ? [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1
        return 0
      })
    : filteredData

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow)

  const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    console.log(event.target)

    setCurrentPage(pageNumber)
  }

  return (
    <Card>
      <div className="m-4 font-bold">Tickets</div>
      <div className="m-2">
      <TextField
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        size="small"
      />
      </div>
      

      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell
              onClick={() => handleSort("id")}
             
            >
              ID
              {sortConfig?.key === "id" &&
                (sortConfig.direction === "ascending" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                ))}
            </TableCell>
            <TableCell onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig?.key === "name" &&
                (sortConfig.direction === "ascending" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                ))}
            </TableCell>
            <TableCell onClick={() => handleSort("age")}>
              Age{" "}
              {sortConfig?.key === "age" &&
                (sortConfig.direction === "ascending" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                ))}
            </TableCell>
            <TableCell onClick={() => handleSort("email")}>
              Email{" "}
              {sortConfig?.key === "email" &&
                (sortConfig.direction === "ascending" ? (
                  <ArrowUpward />
                ) : (
                  <ArrowDownward />
                ))}
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                "&:hover": {
                  backgroundColor: "#F9F9F9",
                },
              }}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(item.id)}>Edit</Button>
                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center gap-x-1 mt-2 mb-[1rem] ml-[1rem]">
        <Select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          size="small"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={currentPage}
          onChange={paginate}
          shape="rounded"
          color="primary"
        />
      </div>
    </Card>
  )
}

export default TableTickets
