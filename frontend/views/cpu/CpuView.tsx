import {Button} from '@hilla/react-components/Button.js';
import {TextField} from '@hilla/react-components/TextField.js';
import {CpuRestEndpoint} from 'Frontend/generated/endpoints.js';
import {useEffect, useState} from 'react';
import { FormikErrors, useFormik } from 'formik';
import PageableModel from "Frontend/generated/dev/hilla/mappedtypes/PageableModel";
import CpuResponseDTO from "Frontend/generated/com/example/application/models/CpuResponseDTO";
import CpuFullDTOModel from "Frontend/generated/com/example/application/models/CpuFullDTOModel";
import CpuFullDTO from "Frontend/generated/com/example/application/models/CpuFullDTO";
import {EndpointValidationError} from "@hilla/frontend";

export default function СpuView() {
    const empty: CpuResponseDTO = {cacheSize: 0, compatibility: '', cores: 0, frequency: 0, graphics: '', id: 0,
        microarchitecture: '', model: '', name: '', productLine: '', quantity: 0, series: '', socket: '', threads: 0, unitPrice: 0}

    const [items, setItems] = useState(Array<CpuResponseDTO | undefined>());

    useEffect(() => {
        (async () => {
            let pageable1 = PageableModel.createEmptyValue();
            pageable1.pageNumber = 1;
            pageable1.pageSize = 100;
            setItems(await CpuRestEndpoint.getCpus(pageable1));
        });

        return () => {};
    }, []);

    const createForm = useFormik({
        initialValues: empty,
        onSubmit: async (value: CpuFullDTO, { setSubmitting, setErrors }) => {
            try {
                const savedId = (await CpuRestEndpoint.addCpu(value)) ?? 1;
                const saved = (await CpuRestEndpoint.getCpuById(savedId))
                setItems([...items, saved]);
                createForm.resetForm();
            } catch (e: unknown) {
                if (e instanceof EndpointValidationError) {
                    const errors: FormikErrors<CpuFullDTO> = {};
                    for (const error of e.validationErrorData) {
                        if (typeof error.parameterName === 'string' && error.parameterName in empty) {
                            const key = error.parameterName as string & keyof CpuFullDTO;
                            errors[key] = error.message;
                        }
                    }
                    setErrors(errors);
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    async function changeStatus(item: CpuFullDTO, done: CpuFullDTO[]) {

    }

    async function updateTask(todo: CpuFullDTO, task: CpuFullDTO[]) {
    }

    async function deleteTodo(todo: CpuFullDTO) {
    }

    return (
        <>
            <section className="flex p-m gap-s items-end">
                <div className="m-m flex items-baseline gap-m">
                    <TextField
                        name="Name"
                        label="Name"
                        value={createForm.values.name}
                        onChange={createForm.handleChange}
                    />
                    <TextField
                        name="Name"
                        label="model"
                        value={createForm.values.model}
                        onChange={createForm.handleChange}
                    />
                    <Button theme="primary" disabled={createForm.isSubmitting} onClick={createForm.submitForm}>
                        Add
                    </Button>
                </div>
                List
                <div className="m-m flex flex-col items-stretch gap-s">
                    {items.map((item) => (
                        <div key={item?.id}>
                            <TextField
                                className="gap-s"
                                name="item name"
                                value={item?.name}
                                label={item?.name}
                            />
                            <TextField
                                className="gap-s"
                                name="item model"
                                value={item?.model}
                                label={item?.model}
                            />
                            <Button onClick={() => {}}>X</Button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
