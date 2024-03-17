// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/blogCategory/Table'

const BlogCategoryComponent = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            Blog Category
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default BlogCategoryComponent