
import { useSwipeable } from "react-swipeable";

export const handlers = (history, path) => useSwipeable({
    // onSwiped: () => console.log("User Swiped!", path, history),
    onSwipedRight: () => history.push({ pathname: path })

});
