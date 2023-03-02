const { Schema, model} = require('mongoose')
const dayjs = require('dayjs')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: value => dayjs(value).format('MMM DD, YYYY [at] hh:mm a')
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought