const prisma = require("../config/prisma");

/*
Get All Users
*/
exports.getUsers = async (req, res) => {
  try {

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};

/*
Delete User
*/
exports.deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) }
    });

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};