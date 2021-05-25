import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const body = req.body
    const newPost = new PostMessage(body)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

    res.send('POST Creation')
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that Id')
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params
    console.log('delete: _id', _id)

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that Id')
    try {
        await PostMessage.findByIdAndRemove(_id)
        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
