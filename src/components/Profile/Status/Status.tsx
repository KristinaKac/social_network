import React, { ChangeEvent, FC, useState } from 'react';
import { useEffect } from 'react';
import { AppDispatch } from '../../../state/redux';
import { useDispatch } from 'react-redux';
import { updateStatusThunk } from '../../../state/profileReducer';

type PropsType = {
    currentStatus: string,
}

const Status: FC<PropsType> = ({ currentStatus }) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState<string>(currentStatus);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        setStatus(currentStatus);
    }, [currentStatus]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateStatusThunk(status));
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