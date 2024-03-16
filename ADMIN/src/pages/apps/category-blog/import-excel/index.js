import { Grid, Typography } from '@mui/material'
import React from 'react'
import PageHeader from 'src/@core/components/page-header'
import MainContent from 'src/views/apps/blogCategory/MainContent'

function importExcel() {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            Import Excel For Blog Category
          </Typography>
        }
      />
      <Grid item xs={12}>
        <MainContent />
      </Grid>
    </Grid>
  )
}

export default importExcel