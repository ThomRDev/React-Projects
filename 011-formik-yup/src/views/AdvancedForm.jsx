import { Form, Formik } from "formik"
import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomInput } from "../components/CustomInput";
import { CustomSelect } from "../components/CustomSelect";
import { advancedSchema } from "./../schemas/auth.schema"


const onSubmit = async (values,actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
  // actions.setValues({
  //   email  :"thom",
  //   age :10
  // })
}

export const AdvancedForm = () => {
  return (
    <Formik
      initialValues={{ username:"",jobType:"",acceptedTos:false }}
      validationSchema={advancedSchema}
      onSubmit
    >
      {({isSubmitting})=>(
        <Form>
          <CustomInput
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
          />
           <CustomSelect
            label="Job Type"
            name="jobType"
            placeholder="Please select a job"
          >
            <option value="">Please select a job type</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Product Manager</option>
            <option value="other">Other</option>
          </CustomSelect>
          <CustomCheckbox type="checkbox" name="acceptedTos" />
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
