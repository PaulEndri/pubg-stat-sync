export default [
    { 
        "$match" : {
            "accountId" : {
                "$in" : [
                    "account.1afd4fa3f18645a5b884c78dee747ee3", 
                    "account.43835e3591cd412eb73ce3d289bbd4ba", 
                    "account.8879c0faf3264cd78cbeecf8d0fe5da3", 
                    "account.e3ddcf195d8d4cc4ad3f1174a378ebce", 
                    "account.d636ca5122fa4cb1996768a038a23c61", 
                    "account.ad9ac70e090247bea554227f05440e26", 
                    "account.28d44c340ea0475c805f880a2fa5b1f7", 
                    "account.28d44c340ea0475c805f880a2fa5b1f7"
                ]
            }
        }
    }, 
    { 
        "$match" : {
            "weapons" : {
                "$exists" : true
            }
        }
    }, 
    { 
        "$project" : {
            "weapons" : "$weapons", 
            "kills" : "$kills", 
            "name" : "$name", 
            "kda" : {
                "$avg" : "$kills"
            }
        }
    }, 
    { 
        "$unwind" : "$weapons"
    }, 
    { 
        "$group" : {
            "_id" : {
                "id" : "$name", 
                "weapon" : "$weapons.name"
            }, 
            "usage" : {
                "$sum" : "$weapons.usage"
            }, 
            "hits" : {
                "$sum" : "$weapons.hit"
            }, 
            "kills" : {
                "$sum" : "$weapons.kills"
            }, 
            "damage" : {
                "$sum" : "$weapons.damage"
            }
        }
    }, 
    { 
        "$project" : {
            "_id" : "$_id", 
            "usage" : "$usage", 
            "hits" : "$hits", 
            "kills" : "$kills", 
            "damage" : "$damage", 
            "accuracy" : {
                "$divide" : [
                    "$hits", 
                    {
                        "$cond" : {
                            "if" : {
                                "$lte" : [
                                    "$usage", 
                                    0.0
                                ]
                            }, 
                            "then" : 1.0, 
                            "else" : "$usage"
                        }
                    }
                ]
            }, 
            "averageDamage" : {
                "$divide" : [
                    "$damage", 
                    {
                        "$cond" : {
                            "if" : {
                                "$lte" : [
                                    "$hits", 
                                    0.0
                                ]
                            }, 
                            "then" : 1.0, 
                            "else" : "$hits"
                        }
                    }
                ]
            }
        }
    }, 
    { 
        "$sort" : {
            "kills" : -1.0
        }
    }, 
    { 
        "$group" : {
            "_id" : "$_id.id", 
            "kills" : {
                "$sum" : "$kills"
            }, 
            "data" : {
                "$push" : {
                    "weapon" : "$_id.weapon", 
                    "usage" : "$usage", 
                    "hits" : "$hits", 
                    "kills" : "$kills", 
                    "damage" : "$damage", 
                    "accuracy" : "$accuracy", 
                    "averageDamage" : "$averageDamage"
                }
            }
        }
    }
]