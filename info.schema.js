
exports.merge_request= {
    users: [String],
    commits: [String],
    comments: [String],
    id: String,
    merge_requests: [String],
    issues: String,
}



exports.commit= {
    users: [String],
    comments: [String],
    id: String,
    merge_request: String,
    issues: [String],
}


exports.user= {
    id: String,
    comments: [String],
    merge_requests: [String],
    issues: [String],
    commit: [String]
}


exports.issue= {
    id: String,
    comments: [String],
    merge_requests: [String],
    commit: [String],
    users: [String]
}