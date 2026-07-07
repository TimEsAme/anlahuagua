const express = require('express')
const router = express.Router()
const studentService = require('../../services/studentService')
const { asyncHandler } = require('../../utils/getSendRes')

router.get('/',
    asyncHandler(async (req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const gender = req.query.gender || -1
        const name = req.query.name || ''

        return await studentService.getStudents(page, limit, gender, name)
    })
)

router.get('/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id
        return await studentService.getStudentById(id)
    })
)

router.post('/',
    asyncHandler(async (req, res) => {
        const stuObj = req.body
        return await studentService.addStudent(stuObj)
    })
)

router.delete('/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id
        return await studentService.deleteStudent(id)
    })
)

router.put('/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id
        const stuObj = req.body
        return await studentService.updateStudent(id, stuObj)
    })
)

module.exports = router