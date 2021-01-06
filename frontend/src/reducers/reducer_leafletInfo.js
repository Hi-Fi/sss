
const INITIAL_STATE = {
    style: "columns",
    columns: "4",
    fontSize: "10",
    saveEvent: false,
    coverImage: false,
    songsOnCover: false,
    songsOnBack: false,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {      
        default:
            return state
    }
}