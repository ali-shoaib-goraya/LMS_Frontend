// mockData.js

export const allUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      roles: ["Admin"],
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      roles: ["Editor"],
      status: "Inactive",   
    },
    {
      id: 3,
      name: "zain doe",
      email: "zain.doe@example.com",
      roles: ["Teacher"],
      status: "Active",
    },

    {
      id: 4,
      name: "Junaid",
      email: "junaid@example.com",
      roles: [ "Student"],
      status: "Active",
    },
    {
      id: 5,
      name: "Ali",
      email: "ali@example.com",
      roles: [ "Student"],
      status: "Active",
    },
    {
      id: 6,
      name: "Rehan",
      email: "rehan@example.com",
      roles: [ "Student"],
      status: "Active",
    },
    {
      id: 7,
      name: "farhan",
      email: "farhan@example.com",
      roles: [ "Student"],
      status: "Active",
    }
  ];
  
  export const allRoles = [
    {
      id: 1,
      name: "Admin",
      description: "Administrator with full access",
      permissions: ["Read", "Write", "Delete"],
      status: "Active",
    },
    {
      id: 2,
      name: "Editor",
      description: "Editor with limited access",
      permissions: ["Read", "Write"],
      status: "Active",
    },
  ];
  
  export const allPermissions=[
    { id: 1, name: "Read" , description: "Read only access", status: "Active"},
    { id: 2, name: "Write", description: "write only access", status: "Active" },
    { id: 3, name: "Delete", description: "Delete only access", status: "Active" },
  ];
  

