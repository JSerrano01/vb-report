import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Card.css'
import { Box, fontWeight } from '@mui/system';

export default function MediaCard(props) {
    const { url, image } = props;
    const [date, setDate] = useState('')
    useEffect(() => {
      const date = new Date(parseInt(image.date));
      setDate(date.toLocaleDateString());
      console.log('url ', url);
      console.log('data ', image);
    }, [])
  return (
    <Card sx={{ width: 400, marginBottom: '30px'}}>
      <CardMedia
        component="img"
        height="140"
        image={image.urlParsed}
        alt="photo"
      />
      <CardContent sx={{backgroundColor: 'rgb(231, 231, 231);'}}>
        <Typography variant="p" sx={{color: '#909091', fontWeight: 'bold'}}>
          {`${image.nombres} ${image.apellidos}`}
        </Typography>
        <Box>
          <Typography variant="p" sx={{color: '#909091', fontWeight: 'bold'}}>
            {'Cedula:  '}
          </Typography>
          <Typography variant="p" sx={{color: '#fd8000'}}>
            {image.cedula}
          </Typography>
        </Box>
        <Box>
          <Typography variant="p" sx={{color: '#909091', fontWeight: 'bold'}}>
           {'Número de contacto: '}
          </Typography>
          <Typography variant="p" sx={{color: '#fd8000'}}>
            {image.num}
          </Typography>
        </Box>
        <Box>
          <Typography variant="p" sx={{color: '#909091', fontWeight: 'bold'}}>
            {'Dirección de la residencia:  '}
          </Typography>
          <Typography variant="p" sx={{color: '#fd8000'}}>
            {image.direccionResidencia}
          </Typography>
        </Box>
        <Box>
          <Typography variant="p" sx={{color: '#909091', fontWeight: 'bold'}}>
            {'Dirección de los hechos:  '}
          </Typography>
          <Typography variant="p" sx={{color: '#fd8000'}}>
            {image.direccionHechos}
          </Typography>
        </Box>
        <Box>
          <Typography variant="p" sx={{color: '#909091', fontWeight: 'bold'}}>
            {'Fecha del reporte:  '}
          </Typography>
          <Typography variant="p" sx={{color: '#fd8000'}}>
            {date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
