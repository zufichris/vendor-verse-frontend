"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, Eye, Edit, Ban, UserCheck, Mail, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  status: "active" | "inactive" | "banned"
  role: "customer" | "admin" | "moderator"
  totalOrders: number
  totalSpent: number
  lastLogin: string
  createdAt: string
  avatar?: string
}

export default function AdminUsers() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      role: "customer",
      totalOrders: 12,
      totalSpent: 1299.99,
      lastLogin: "2024-01-15T10:30:00Z",
      createdAt: "2023-06-15T09:00:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      role: "customer",
      totalOrders: 8,
      totalSpent: 899.5,
      lastLogin: "2024-01-14T15:45:00Z",
      createdAt: "2023-08-22T14:30:00Z",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "inactive",
      role: "customer",
      totalOrders: 3,
      totalSpent: 299.99,
      lastLogin: "2023-12-01T08:15:00Z",
      createdAt: "2023-05-10T11:20:00Z",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "+1 (555) 456-7890",
      status: "active",
      role: "moderator",
      totalOrders: 0,
      totalSpent: 0,
      lastLogin: "2024-01-15T12:00:00Z",
      createdAt: "2023-01-15T10:00:00Z",
    },
    {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      status: "banned",
      role: "customer",
      totalOrders: 1,
      totalSpent: 49.99,
      lastLogin: "2023-11-20T16:30:00Z",
      createdAt: "2023-11-01T13:45:00Z",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "rgb(34, 197, 94)"
      case "inactive":
        return "rgb(107, 114, 128)"
      case "banned":
        return "rgb(239, 68, 68)"
      default:
        return "rgb(107, 114, 128)"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "rgb(239, 68, 68)"
      case "moderator":
        return "rgb(59, 130, 246)"
      case "customer":
        return "rgb(107, 114, 128)"
      default:
        return "rgb(107, 114, 128)"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const updateUserStatus = (userId: string, newStatus: string) => {
    console.log(`Updating user ${userId} status to ${newStatus}`)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold" style={{ color: "rgb(17, 24, 39)" }}>
            Users
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgb(107, 114, 128)" }}>
            Manage user accounts and permissions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserCheck className="h-8 w-8" style={{ color: "rgb(34, 197, 94)" }} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: "rgb(107, 114, 128)" }}>
                    Active Users
                  </dt>
                  <dd className="text-lg font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {users.filter((u) => u.status === "active").length}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Mail className="h-8 w-8" style={{ color: "rgb(59, 130, 246)" }} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: "rgb(107, 114, 128)" }}>
                    Total Users
                  </dt>
                  <dd className="text-lg font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {users.length}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Ban className="h-8 w-8" style={{ color: "rgb(239, 68, 68)" }} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: "rgb(107, 114, 128)" }}>
                    Banned Users
                  </dt>
                  <dd className="text-lg font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {users.filter((u) => u.status === "banned").length}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Phone className="h-8 w-8" style={{ color: "rgb(168, 85, 247)" }} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: "rgb(107, 114, 128)" }}>
                    New This Month
                  </dt>
                  <dd className="text-lg font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {
                      users.filter((u) => new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                        .length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
            style={{ color: "rgb(107, 114, 128)" }}
          />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
          style={{ borderColor: "rgb(209, 213, 219)", color: "rgb(17, 24, 39)" }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
          style={{ borderColor: "rgb(209, 213, 219)", color: "rgb(17, 24, 39)" }}
        >
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Users Table */}
      <div className="mt-8">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y" style={{ borderColor: "rgb(229, 231, 235)" }}>
                <thead style={{ backgroundColor: "rgb(249, 250, 251)" }}>
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      User
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Role
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Orders
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Total Spent
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Last Login
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y"
                  style={{ backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(229, 231, 235)" }}
                >
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                            style={{ backgroundColor: "rgb(59, 130, 246)" }}
                          >
                            <span className="text-sm font-medium text-white">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                              {user.name}
                            </div>
                            <div className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                              {user.email}
                            </div>
                            {user.phone && (
                              <div className="text-xs" style={{ color: "rgb(107, 114, 128)" }}>
                                {user.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full capitalize"
                          style={{
                            backgroundColor: `${getRoleColor(user.role)}20`,
                            color: getRoleColor(user.role),
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "rgb(17, 24, 39)" }}>
                        {user.totalOrders}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        style={{ color: "rgb(17, 24, 39)" }}
                      >
                        {formatCurrency(user.totalSpent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full capitalize"
                          style={{
                            backgroundColor: `${getStatusColor(user.status)}20`,
                            color: getStatusColor(user.status),
                          }}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            {user.status === "active" && (
                              <DropdownMenuItem onClick={() => updateUserStatus(user.id, "banned")}>
                                <Ban className="h-4 w-4 mr-2" />
                                Ban User
                              </DropdownMenuItem>
                            )}
                            {user.status === "banned" && (
                              <DropdownMenuItem onClick={() => updateUserStatus(user.id, "active")}>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Unban User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
