import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Package, User, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Mock data based on the provided JSON
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

export default function Component() {
  const stockEntry = stockData.data.items[0]
  const { meta } = stockData

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalQuantity = stockEntry.stockItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stock Management</h1>
          <p className="text-muted-foreground">Manage your inventory and stock entries</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {stockData.status === "success" ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entry Code</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockEntry.entryCode}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stockEntry.totalPrice}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created By</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockEntry.user.firstName}</div>
            <p className="text-xs text-muted-foreground">{stockEntry.user.email}</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Entry Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Stock Entry Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm text-muted-foreground">{formatDate(stockEntry.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Updated:</span>
                <span className="text-sm text-muted-foreground">{formatDate(stockEntry.updatedAt)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{stockEntry.user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{stockEntry.user.firstName}</span>
                <span className="text-sm text-muted-foreground">({stockEntry.user.email})</span>
              </div>
              {stockEntry.notes && (
                <div>
                  <span className="text-sm font-medium">Notes:</span>
                  <p className="text-sm text-muted-foreground">{stockEntry.notes}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Watch Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockEntry.stockItems.map((item) => (
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
                  <TableCell className="font-medium">{item.watch.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.quantity}</Badge>
                  </TableCell>
                  <TableCell>${item.costPrice}</TableCell>
                  <TableCell className="font-medium">${item.quantity * item.costPrice}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(item.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {meta.totalItems} of {meta.totalItems} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled={meta.page === 1}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              {meta.page}
            </Button>
          </div>
          <Button variant="outline" size="sm" disabled={meta.page === meta.totalPages}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
