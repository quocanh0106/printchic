// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/productCategory/Table'

const ProductCategory = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            Product Category
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default ProductCategory
