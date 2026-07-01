const Class = require('../models/Class')
const Student = require('../models/Student')

Class.hasMany(Student)
Student.belongsTo(Class)
