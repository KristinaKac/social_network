import React, { useState } from 'react';
import { useEffect } from 'react';

const Status = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.currentStatus);

    useEffect(() => {
        setStatus(props.currentStatus);
    }, [props.currentStatus]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatusThunk(status);
    }
    const onInputChange = (e) => {
        setStatus(e.target.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>
                        {props.currentStatus ? props.currentStatus : 'No status'}
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