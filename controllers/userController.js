import User from '../models/userModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import APIFeatures from '../utils/apiFeatures.js'

const filterUserObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

const updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Use /updateMyPassword instead.',
                400
            )
        )
    }

    const filteredUserObj = filterUserObj(
        req.body,
        'email',
        'firstName',
        'lastName',
        'phoneNumber'
    )

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        filteredUserObj,
        {
            new: true,
            runValidators: true,
        }
    )

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    })
})

const deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, {
        active: false,
    })

    res.status(204).json({
        status: 'success',
        data: null,
    })
})

const getAllUsers = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const users = await features.query

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    })
})

const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new AppError('No user found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    })
})

const createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
    })
})

const updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    if (!user) {
        return next(new AppError('No user found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    })
})

const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return next(new AppError('No user found with that ID', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null,
    })
})

export {
    updateMe,
    deleteMe,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
}
