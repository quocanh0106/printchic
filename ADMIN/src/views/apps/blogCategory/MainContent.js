import { Button, Card, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from 'src/@core/components/mui/text-field';
import * as XLSX from 'xlsx';

function MainContent() {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 })
  const [dataTable, setDataTable] = useState([])

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm()

  const columns = [
    {
      flex: 0.05,
      minWidth: 50,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {row.id}
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      field: 'title',
      minWidth: 170,
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`title-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  required
                  onChange={onChange}
                  placeholder='Title'
                  error={Boolean(errors[`title-${row.id}`])}
                  aria-describedby='validation-basic-first-name'
                  {...(errors[`title-${row.id}`] && { helperText: 'This field is required' })}
                />
              )}
            />
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      field: 'handleUrl',
      minWidth: 170,
      headerName: 'Handle URL',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`handleUrl-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  required
                  onChange={onChange}
                  placeholder='handleUrl'
                  error={Boolean(errors[`handleUrl-${row.id}`])}
                  aria-describedby='validation-basic-first-name'
                  {...(errors[`handleUrl-${row.id}`] && { helperText: 'This field is required' })}
                />
              )}
            />
          </Box>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 120,
      headerName: 'description',
      field: 'description',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`description-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  required
                  onChange={onChange}
                  placeholder='description'
                  error={Boolean(errors[`description-${row.id}`])}
                  aria-describedby='validation-basic-first-name'
                  {...(errors[`description-${row.id}`] && { helperText: 'This field is required' })}
                />
              )}
            />
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'metaDescription',
      headerName: 'Meta Description',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`metaDescription-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  required
                  onChange={onChange}
                  placeholder='metaDescription'
                  error={Boolean(errors[`metaDescription-${row.id}`])}
                  aria-describedby='validation-basic-first-name'
                  {...(errors[`metaDescription-${row.id}`] && { helperText: 'This field is required' })}
                />
              )}
            />
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'bannerImg',
      headerName: 'Banner Image',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`bannerImg-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  required
                  onChange={onChange}
                  placeholder='bannerImg'
                  error={Boolean(errors[`bannerImg-${row.id}`])}
                  aria-describedby='validation-basic-first-name'
                  {...(errors[`bannerImg-${row.id}`] && { helperText: 'This field is required' })}
                />
              )}
            />
          </Box>
        )
      }
    },
  ]

  const downloadSampleExcel = () => {
    const data = [
      ['title', 'handleUrl', 'metaDescription', 'description', 'bannerImg'],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'list_blog_category.xlsx');
  };

  const updateDataToTable = (data) => {
    data.forEach((ele) => {
      setValue(`title-${ele.id}`, ele.title);
      setValue(`handleUrl-${ele.id}`, ele.handleUrl);
      setValue(`description-${ele.id}`, ele.description);
      setValue(`metaDescription-${ele.id}`, ele.metaDescription);
      setValue(`bannerImg-${ele.id}`, ele.bannerImg);
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const newData = data.map((ele, index) => {
        return {
          title: ele[0],
          handleUrl: ele[1],
          description: ele[2],
          metaDescription: ele[3],
          bannerImg: ele[4],
          id: index,
        }
      })
      newData.shift()
      updateDataToTable(newData)
      setDataTable(newData)
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={{
              p: 5,
              pb: 3,
            }}
          >
            <div style={{ display: 'flex', gap: 20, justifyContent: 'space-between' }}>
              <div>
                <Button
                  variant='contained'
                  onClick={downloadSampleExcel}
                  sx={{ mr: 5 }}
                >
                  Download sample excel
                </Button>
                <Button sx={{ width: '135px' }} variant='contained'>
                  <input type="file" onChange={handleFileChange} />
                </Button>
              </div>
              <div>
                <Button
                  variant='contained'
                  onClick={() => searchProductCategory()}
                  sx={{ mr: 5 }}
                >
                  Validate
                </Button>
                <Button sx={{ width: '145px' }} variant='contained'>
                  Upload excel
                </Button>
              </div>
            </div>
          </Box>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={dataTable}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MainContent