const bodyParser = require('body-parser');
const express = require('express'); 

const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = []
let counter =1;

//path = /
app.get('/users', (req, res) => {
    res.json(users);
});

//ptah = POST /users
app.post('/users', (req, res) => {
    let newUser = req.body; 
    newUser.id = counter++;
    users.push(newUser);    
    res.json({
        message: 'User added successfully', 
        user: newUser       
    });
});

//put = PUT /users/:id (อาจารย์ให้ใช้ patch เพื่ออัปเดตข้อมูล)
app.patch('/users/:id', (req, res) => { 
    let id = req.params.id;
    let updatedUser = req.body;

    // หา user จาก id 
    let selectedIndex = users.findIndex(user => user.id == id);

    if (selectedIndex !== -1) {
        if (updatedUser.name) { 
            users[selectedIndex].name = updatedUser.name;
        }
        if (updatedUser.email) {
            users[selectedIndex].email = updatedUser.email;
        }   
        if (updatedUser.age) {
            users[selectedIndex].age = updatedUser.age;
        }   

        updatedUser.id = Number(id);
        users[selectedIndex] = updatedUser;
    }

    // ส่ง response กลับไปว่าอัพเดตสำเร็จ
    res.json({
        message: 'User updated successfully',
        data: {
            user: updatedUser,
            indexUpdated: selectedIndex
        }
    });
}); 

app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    let selectedIndex = users.findIndex(user => user.id == id);
    if (selectedIndex !== -1) {
        users.splice(selectedIndex, 1);
        res.json({
            message: 'User deleted successfully',
            deletedIndex: selectedIndex
        });
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});