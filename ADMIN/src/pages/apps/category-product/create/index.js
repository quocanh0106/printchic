// ** MUI Imports
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import FormCreate from 'src/views/apps/productCategory/create/FormCreate'

const BlogCategoryComponent = () => {
  return (
    <Grid container spacing={6}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyItems: 'space-between', mt: 5, ml: 5 }}>
        <PageHeader
          title={
            <Typography variant='h4'>
              Create Blog Category
            </Typography>
          }
        />
      </Box>
      <Grid item xs={12}>
        <FormCreate />
      </Grid>
    </Grid>
  )
}

export default BlogCategoryComponent
