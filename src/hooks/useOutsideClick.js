import { useEffect } from "react";

export const useOutsideClick = (refs, callback) => {
    const handleClick = (e) => {
        let outsideClickCount = 0;

        if (Array.isArray(refs)) {
            // eslint-disable-next-line no-unused-vars
            for (const ref of refs) {
                if (ref.current && !ref.current.contains(e.target)) {
                    outsideClickCount++;
                }
            }

            if (outsideClickCount === refs.length) {
                callback();
            }
        } else {
            if (refs.current && !refs.current.contains(e.target)) {
                callback();
            }
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};
