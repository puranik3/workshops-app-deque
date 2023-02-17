import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { addSession as addSessionSvc } from '../../services/sessions';
import ISession from '../../models/ISession';

type AddSessionProps = {
    id: number | string
}

type FormData = Omit<ISession, 'id' | 'workshopId' | 'upvoteCount'>

const AddSession = ( { id } : AddSessionProps ) => {
    const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<FormData>({
        mode: 'all'
    });

    const navigate = useNavigate();

    const isDurationOkForLevel = () => { // Basic >= 1 hr, Intermediate >= 2 hr, Advanced >= 3 hr
        const level = getValues( 'level' );
        const duration = +getValues( 'duration' );

        if( level === 'Basic' && duration < 1 ) {
            return false;
        }
        
        if( level === 'Intermediate' && duration < 2 ) {
            return false;
        }
        
        if( level === 'Advanced' && duration < 3 ) {
            return false;
        }

        trigger( 'level' );

        return true;
    };

    const addSession = async ( session : FormData ) => {
        const sessionToSubmit = {
            workshopId: +id,
            upvoteCount: 0,
            ...session
        };

        try {
            const addedSession = await addSessionSvc( sessionToSubmit );
            alert( `Session has been added and assigned id = ${addedSession.id}` );
            navigate( '..' );
        } catch( error ) {
            alert( (error as Error).message );
        }
    };

    return (
        <div className="container">
            <h1>
                Add a session
                <Link to=".." className="btn btn-danger btn-sm float-end">Cancel</Link>
            </h1>
            <hr />
            <form onSubmit={handleSubmit(addSession)}>
                <div className="mb-3 row">
                    <label
                        htmlFor="sequenceId"
                        className="col-sm-2 col-form-label"
                    >
                        Sequence ID
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="sequenceId"
                            {...register( 'sequenceId', { required: true, min: 1 } )}
                        />
                        <small className="text-danger">
                        {
                            errors?.sequenceId?.type === 'required' && (
                                <div>Sequence ID is required</div>
                            )
                        }
                        {
                            errors?.sequenceId?.type === 'min' && (
                                <div>Sequence ID should be minimum 1</div>
                            )
                        }
                        </small>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        htmlFor="name"
                        className="col-sm-2 col-form-label"
                    >
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            {...register( 'name', { required: true } )}
                        />
                        <small className="text-danger">
                        {
                            errors?.name?.type === 'required' && (
                                <div>Name is required</div>
                            )
                        }
                        </small>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        htmlFor="speaker"
                        className="col-sm-2 col-form-label"
                    >
                        Speaker(s)
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="speaker"
                            {...register( 'speaker', { required: true, pattern: /^[A-Za-z ]+(,[A-Za-z ]+)*$/ } )}
                        />
                        <small className="text-danger">
                        {
                            errors?.speaker?.type === 'required' && (
                                <div>At least 1 speaker is required</div>
                            )
                        }
                        {
                            errors?.speaker?.type === 'pattern' && (
                                <div>Speaker names can have only letters and spaces, and multiple speaker names must be comma-separated</div>
                            )
                        }
                        </small>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        htmlFor="duration"
                        className="col-sm-2 col-form-label"
                    >
                        Duration (in hours)
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="duration"
                            {...register( 'duration', { required: true, pattern: /^\d+(\.\d+)?$/, validate: isDurationOkForLevel })}
                        />
                        <small className="text-danger">
                        {
                            errors?.duration?.type === 'required' && (
                                <div>Duration (in hours) is required</div>
                            )
                        }
                        {
                            errors?.duration?.type === 'pattern' && (
                                <div>Duration must be a positive number with a decimal part optionally</div>
                            )
                        }
                        </small>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        htmlFor="level"
                        className="col-sm-2 col-form-label"
                    >
                        Level
                    </label>
                    <div className="col-sm-10">
                        <select
                            className="form-select"
                            id="level"
                            {...register( 'level', { required: true, validate: isDurationOkForLevel } )}
                        >
                            <option value="">Choose the level</option>
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        <small className="text-danger">
                        {
                            errors?.level?.type === 'required' && (
                                <div>Level is required</div>
                            )
                        }
                        {
                            errors?.level?.type === 'validate' && (
                                <div>
                                    Specified duration does not match the chosen level. Basic level session must be at least 1 hour long. Intermediate at leat 2 hours. Advanced at least 3 hours.
                                </div>
                            )
                        }
                        </small>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        htmlFor="abstract"
                        className="col-sm-2 col-form-label"
                    >
                        Abstract
                    </label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            id="abstract"
                            {...register( 'abstract', { required: true, minLength: 10 })}
                        ></textarea>
                        <small className="text-danger">
                        {
                            errors?.abstract?.type === 'required' && (
                                <div>Abstract is required</div>
                            )
                        }
                        {
                            errors?.abstract?.type === 'minLength' && (
                                <div>At least 10 characters must be provided</div>
                            )
                        }
                        </small>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="offset-2 col-10">
                        <button type="submit" className="btn btn-primary">Add workshop</button>
                    </div>
                </div>
            </form>
      </div>
    );
};

export default AddSession;