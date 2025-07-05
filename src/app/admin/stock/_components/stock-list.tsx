"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Package, DollarSign, TrendingUp, Eye, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

const stockData = {
  status: "success",
  message: "Fetch all stock entries successfully",
  data: {
    items: [
      {
        id: "4f5db3ad-fa7e-463b-a31a-afa6a161eb79",
        entryCode: "STEC0DC999",
        totalPrice: 4,
        createdBy: "a0b8da9e-6b71-48af-bb31-4d72117c242b",
        notes: "á打算打算·",
        createdAt: "2025-07-05T04:48:32.348Z",
        updatedAt: "2025-07-05T04:48:32.348Z",
        deletedAt: null,
        user: {
          id: "a0b8da9e-6b71-48af-bb31-4d72117c242b",
          email: "tranhailoc7@gmail.com",
          firstName: "Hải",
        },
        stockItems: [
          {
            id: "8d26aadc-8631-4ecb-a42d-111882271a92",
            quantity: 1,
            costPrice: 2,
            stockEntryId: "4f5db3ad-fa7e-463b-a31a-afa6a161eb79",
            watchId: "c6d43612-560f-46c6-8b98-a487c199b5a1",
            createdAt: "2025-07-05T04:48:32.348Z",
            updatedAt: "2025-07-05T04:48:32.348Z",
            deletedAt: null,
            watch: {
              id: "c6d43612-560f-46c6-8b98-a487c199b5a1",
              name: "dsjnskjdvnjsfdnvjdnvjdn",
              images: [
                {
                  id: "ee844964-3738-49cc-ad87-3d108db322fd",
                  public_id: "aead6usckq26j0iyeuyk",
                  absolute_url:
                    "https://res.cloudinary.com/dhuniu3mt/image/upload/v1751557990/aead6usckq26j0iyeuyk.png",
                  watchId: "c6d43612-560f-46c6-8b98-a487c199b5a1",
                  createdAt: "2025-07-03T15:53:13.291Z",
                  updatedAt: "2025-07-03T15:53:13.291Z",
                  deletedAt: null,
                },
              ],
            },
          },
          {
            id: "9429fd32-9533-4645-a458-001bca92e3ec",
            quantity: 1,
            costPrice: 2,
            stockEntryId: "4f5db3ad-fa7e-463b-a31a-afa6a161eb79",
            watchId: "cd576164-2aad-4359-9c29-f0bc67610d6d",
            createdAt: "2025-07-05T04:48:32.348Z",
            updatedAt: "2025-07-05T04:48:32.348Z",
            deletedAt: null,
            watch: {
              id: "cd576164-2aad-4359-9c29-f0bc67610d6d",
              name: "1",
              images: [
                {
                  id: "190d04de-4d73-4b9e-ba5b-e022f877c208",
                  public_id: "s0mtv9bofibv5yygeugf",
                  absolute_url:
                    "https://res.cloudinary.com/dhuniu3mt/image/upload/v1751555965/s0mtv9bofibv5yygeugf.jpg",
                  watchId: "cd576164-2aad-4359-9c29-f0bc67610d6d",
                  createdAt: "2025-07-03T15:26:20.214Z",
                  updatedAt: "2025-07-03T15:26:20.214Z",
                  deletedAt: null,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  meta: {
    limit: 10,
    page: 1,
    totalItems: 1,
    totalPages: 1,
  },
}

export default function StockList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")

  // Flatten all stock items from all entries
  const allStockItems = stockData.data.items.flatMap((entry) =>
    entry.stockItems.map((item) => ({
      ...item,
      entryCode: entry.entryCode,
      entryCreatedBy: entry.user.firstName,
      entryCreatedByEmail: entry.user.email,
      entryNotes: entry.notes,
    })),
  )

  // Calculate summary statistics
  const totalItems = allStockItems.length
  const totalQuantity = allStockItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = allStockItems.reduce((sum, item) => sum + item.quantity * item.costPrice, 0)
  const averagePrice = totalValue / totalQuantity

  // Filter and search logic
  const filteredItems = allStockItems.filter((item) => {
    const matchesSearch =
      item.watch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.entryCode.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterBy === "all") return matchesSearch
    if (filterBy === "low-stock") return matchesSearch && item.quantity <= 1
    if (filterBy === "high-value") return matchesSearch && item.costPrice >= 2

    return matchesSearch
  })

  // Sort logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.watch.name.localeCompare(b.watch.name)
      case "price":
        return b.costPrice - a.costPrice
      case "quantity":
        return b.quantity - a.quantity
      case "date":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Stock Inventory</h1>
          <p className="text-muted-foreground">Complete list of all stock items</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Package className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">Add New Item</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Unique products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity}</div>
            <p className="text-xs text-muted-foreground">Units in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue}</div>
            <p className="text-xs text-muted-foreground">Inventory value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePrice.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per unit</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by watch name or entry code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
                <SelectItem value="date">Date Added</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="high-value">High Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stock Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Stock Items ({sortedItems.length})</span>
            <Badge variant="secondary">{sortedItems.length} items found</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Entry Code</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Cost Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No items found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="w-12 h-12 relative rounded-md overflow-hidden bg-muted">
                          {item.watch.images.length > 0 ? (
                            <Image
                              src={item.watch.images[0].absolute_url || "/placeholder.svg"}
                              alt={item.watch.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.watch.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {item.watch.id.slice(0, 8)}...</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.entryCode}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.quantity <= 1 ? "destructive" : "secondary"}>{item.quantity}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">${item.costPrice}</TableCell>
                      <TableCell className="font-medium">${item.quantity * item.costPrice}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{item.entryCreatedBy.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{item.entryCreatedBy}</div>
                            <div className="text-xs text-muted-foreground">{item.entryCreatedByEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(item.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {sortedItems.length} of {totalItems} items
        </div>
        <div className="text-sm text-muted-foreground">
          Total inventory value: <span className="font-medium">${totalValue}</span>
        </div>
      </div>
    </div>
  )
}
