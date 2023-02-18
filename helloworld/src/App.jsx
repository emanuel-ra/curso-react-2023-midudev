import { useState } from "react";
import TwitterFollowCard from "./TwitterFollowCard";

const users = [
    {
        userName:'midudev' ,
        name:'Miguel Àngel Duran' ,
        isFollowing:true 
    } ,
    {
        userName:'emanuel-ra' ,
        name:'Emanuel Ramirez Abarca' ,
        isFollowing:false
    }
]

export function App () {
    
    return (
        <section className="app">
            {
                users.map( (user,index) => {
                    const {userName,name,isFollowing} = user
                    return (
                            <TwitterFollowCard  
                                key={`tw-followCard-${index}`}                
                                userName={userName} initialIsFollowing={isFollowing}
                                >
                                {name}
                            </TwitterFollowCard>
                        )
                })
            }
        </section>
    )
}

