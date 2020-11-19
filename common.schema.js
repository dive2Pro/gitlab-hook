exports.common = {
    "id": String,
    "object_kind": {
        type: String
    },
    "user": {
        "name": {type: String},
        "username": {type: String},
        "avatar_url": {type: String}
    },
    "project_id": {type: String},
    "project": {
        "name": {type: String},
        "description": {type: String},
        "web_url": {type: String},
        "avatar_url": {type: String},
        "git_ssh_url": {type: String},
        "git_http_url": {type: String},
        "namespace": {type: String},
        "visibility_level": {type: String},
        "path_with_namespace": {type: String},
        "default_branch": {type: String},
        "homepage": {type: String},
        "url": {type: String},
        "ssh_url": {type: String},
        "http_url": {type: String}
    },
    "object_attributes": {
        "id": {type: String},
        "note": {type: String},
        "noteable_type": {type: String},
        "author_id": {type: String},
        "created_at": {type: String},
        "updated_at": {type: String},
        "project_id": {type: String},
        "attachment": {type: String},
        "line_code": {type: String},
        "commit_id": {type: String},
        "noteable_id": {type: Number},
        "system": {type: Boolean},
        "st_diff": {
            "diff": {type: String},
            "new_path": {type: String},
            "old_path": {type: String},
            "a_mode": {type: String},
            "b_mode": {type: String},
            "new_file": {type: Boolean},
            "renamed_file": {type: Boolean},
            "deleted_file": {type: Boolean},
            "too_large": {type: Boolean}
        },
        "updated_by_id": {type: String},
        "is_award": {type: Boolean},
        "type": {type: String},
        "url": {type: String},
        "description": String,
        "iid": Number,

    },
    "repository": {
        "name": {type: String},
        "url": {type: String},
        "description": {type: String},
        "homepage": {type: String}
    },
    "merge_request": {
        "id": {type: String},
        "target_branch": {type: String},
        "source_branch": {type: String},
        "source_project_id": {type: String},
        "author_id": {type: String},
        "assignee_id": {type: String},
        "title": {type: String},
        "created_at": {type: String},
        "updated_at": {type: String},
        "milestone_id": {type: String},
        "state": {type: String},
        "merge_status": {type: String},
        "target_project_id": {type: String},
        "iid": {type: String},
        "description": {type: String},
        "position": {type: String},
        "locked_at": {type: String},
        "updated_by_id": {type: String},
        "merge_error": {type: String},
        "merge_params": {
            "force_remove_source_branch": {type: String}
        },
        "merge_when_build_succeeds": {type: Boolean},
        "merge_user_id": {type: String},
        "merge_commit_sha": {type: String},
        "deleted_at": {type: String},
        "source": {
            "name": {type: String},
            "description": {type: String},
            "web_url": {type: String},
            "avatar_url": {type: String},
            "git_ssh_url": {type: String},
            "git_http_url": {type: String},
            "namespace": {type: String},
            "visibility_level": {type: Number},
            "path_with_namespace": {type: String},
            "default_branch": {type: String},
            "homepage": {type: String},
            "url": {type: String},
            "ssh_url": {type: String},
            "http_url": {type: String}
        },
        "target": {
            "name": {type: String},
            "description": {type: String},
            "web_url": {type: String},
            "avatar_url": {type: String},
            "git_ssh_url": {type: String},
            "git_http_url": {type: String},
            "namespace": {type: String},
            "visibility_level": {type: Number},
            "path_with_namespace": {type: String},
            "default_branch": {type: String},
            "homepage": {type: String},
            "url": {type: String},
            "ssh_url": {type: String},
            "http_url": {type: String}
        },
        "last_commit": {
            "id": {type: String},
            "message": {type: String},
            "timestamp": {type: String},
            "url": {type: String},
            "author": {
                "name": {type: String},
                "email": {type: String}
            }
        },
        "work_in_progress": {type: Boolean}
    },
    "issue": {
        "id": {type: String},
        "title": {type: String},
        "assignee_ids": [{type: String}],
        "assignee_id": {type: String},
        "author_id": {type: Number},
        "project_id": {type: Number},
        "created_at": {type: String},
        "updated_at": {type: String},
        "milestone_id": {type: String},
        "state": {type: String},
        "iid": {type: String},
        "description": {type: String},
        "position": {type: String},
        "branch_name": {type: String},
        "labels": [{
            "id": {type: Number},
            "title": {type: String},
            "color": {type: String},
            "project_id": {type: String},
            "created_at": {type: String},
            "updated_at": {type: String},
            "template": {type: Boolean},
            "description": {type: String},
            "type": {type: String},
            "group_id": {type: String}
        }]
    },
    "commit": {
        "id": {type: String},
        "message": {type: String},
        "timestamp": [{type: String}],
        "url": {type: String},
        "author": {
            "name": {type: String},
            "email": {type: String}
        }
    }
}


exports.mq = {
    "id": String,
    "object_kind": {
        "type": "String"
    },
    "user": {
        "name": {
            "type": "String"
        },
        "username": {
            "type": "String"
        },
        "avatar_url": {
            "type": "String"
        }
    },
    "project": {
        "id": {
            "type": "Number"
        },
        "name": {
            "type": "String"
        },
        "description": {
            "type": "String"
        },
        "web_url": {
            "type": "String"
        },
        "avatar_url": {
            "type": "Mixed"
        },
        "git_ssh_url": {
            "type": "String"
        },
        "git_http_url": {
            "type": "String"
        },
        "namespace": {
            "type": "String"
        },
        "visibility_level": {
            "type": "Number"
        },
        "path_with_namespace": {
            "type": "String"
        },
        "default_branch": {
            "type": "String"
        },
        "homepage": {
            "type": "String"
        },
        "url": {
            "type": "String"
        },
        "ssh_url": {
            "type": "String"
        },
        "http_url": {
            "type": "String"
        }
    },
    "repository": {
        "name": {
            "type": "String"
        },
        "url": {
            "type": "String"
        },
        "description": {
            "type": "String"
        },
        "homepage": {
            "type": "String"
        }
    },
    "object_attributes": {
        "id": {
            "type": "Number"
        },
        "target_branch": {
            "type": "String"
        },
        "source_branch": {
            "type": "String"
        },
        "source_project_id": {
            "type": "Number"
        },
        "author_id": {
            "type": "Number"
        },
        "assignee_id": {
            "type": "Number"
        },
        "title": {
            "type": "String"
        },
        "created_at": {
            "type": "Date"
        },
        "updated_at": {
            "type": "Date"
        },
        "milestone_id": {
            "type": "Mixed"
        },
        "state": {
            "type": "String"
        },
        "merge_status": {
            "type": "String"
        },
        "target_project_id": {
            "type": "Number"
        },
        "iid": {
            "type": "Number"
        },
        "description": {
            "type": "String"
        },
        "source": {
            "name": {
                "type": "String"
            },
            "description": {
                "type": "String"
            },
            "web_url": {
                "type": "String"
            },
            "avatar_url": {
                "type": "Mixed"
            },
            "git_ssh_url": {
                "type": "String"
            },
            "git_http_url": {
                "type": "String"
            },
            "namespace": {
                "type": "String"
            },
            "visibility_level": {
                "type": "Number"
            },
            "path_with_namespace": {
                "type": "String"
            },
            "default_branch": {
                "type": "String"
            },
            "homepage": {
                "type": "String"
            },
            "url": {
                "type": "String"
            },
            "ssh_url": {
                "type": "String"
            },
            "http_url": {
                "type": "String"
            }
        },
        "target": {
            "name": {
                "type": "String"
            },
            "description": {
                "type": "String"
            },
            "web_url": {
                "type": "String"
            },
            "avatar_url": {
                "type": "Mixed"
            },
            "git_ssh_url": {
                "type": "String"
            },
            "git_http_url": {
                "type": "String"
            },
            "namespace": {
                "type": "String"
            },
            "visibility_level": {
                "type": "Number"
            },
            "path_with_namespace": {
                "type": "String"
            },
            "default_branch": {
                "type": "String"
            },
            "homepage": {
                "type": "String"
            },
            "url": {
                "type": "String"
            },
            "ssh_url": {
                "type": "String"
            },
            "http_url": {
                "type": "String"
            }
        },
        "last_commit": {
            "id": {
                "type": "String"
            },
            "message": {
                "type": "String"
            },
            "timestamp": {
                "type": "Date"
            },
            "url": {
                "type": "String"
            },
            "author": {
                "name": {
                    "type": "String"
                },
                "email": {
                    "type": "String"
                }
            }
        },
        "work_in_progress": {
            "type": "Boolean"
        },
        "url": {
            "type": "Date"
        },
        "action": {
            "type": "String"
        },
        "assignee": {
            "name": {
                "type": "String"
            },
            "username": {
                "type": "String"
            },
            "avatar_url": {
                "type": "String"
            }
        }
    },
    "labels": {
        "type": [
            "Mixed"
        ]
    },
    "changes": {
        "updated_by_id": {
            "previous": {
                "type": "Mixed"
            },
            "current": {
                "type": "Number"
            }
        },
        "updated_at": {
            "previous": {
                "type": "Date"
            },
            "current": {
                "type": "Date"
            }
        },
        "labels": {
            "previous": {
                "type": [
                    "Mixed"
                ]
            },
            "current": {
                "type": [
                    "Mixed"
                ]
            }
        }
    }
}
