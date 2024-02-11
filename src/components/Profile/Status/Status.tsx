import React, { ChangeEvent, FC, useState } from 'react';
import { useEffect } from 'react';

type PropsType = {
    currentStatus: string,
    updateStatusThunk: (status: string) => void
}

const Status: FC<PropsType> = ({ currentStatus, updateStatusThunk }) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState<string>(currentStatus);

    useEffect(() => {
        setStatus(currentStatus);
    }, [currentStatus]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatusThunk(status);
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>
                        {currentStatus ? currentStatus : 'No status'}
                    </span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onInputChange} autoFocus={true}
                        onBlur={deactivateEditMode} type="text" value={status} />
                </div>
            }
        </div>
    )
}
export default Status;