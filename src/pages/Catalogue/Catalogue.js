import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Container,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import { Add, Close, Visibility, Hexagon, HexagonOutlined, ReadMore, Remove, Search } from '@mui/icons-material';

// Non Material UI icons
import ClearFiltersIcon from '../../assets/ClearFiltersIcon';
import FilterIcon from '../../assets/FilterIcon';

import { Pagination } from '../../components';
import './catalogue.scss';
import Data from '../../data.json';

const pageSize = 5;
const allPDFs = Data.pdfList;
const allFilters = Data.filters;

const Catalogue = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(allPDFs);
  const [currentPageData, setCurrentPageData] = useState(filteredData.slice(0, 5));

  const [expanded, setExpanded] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false); // filters on mobile devices
  const [clearBtnDisabled, setClearBtnDisabled] = useState(true);

  const history = useHistory();
  const location = useLocation();

  const arrayString = (data, isString) => {
    //stringifys the array to place in the url or parses when pulling from the url
    const modified = {};
    Object.keys(data).map((key) => {
      if (!isString && typeof data[key] === 'object') {
        //return array as string
        modified[key] = data[key].toString();
      } else if (isString && key !== 'searchTerm') {
        //split the comma-separated string into an array
        modified[key] = [];
        data[key].split(',').map((item) => modified[key].push(item));
      } else modified[key] = data[key];
    });

    return modified;
  };

  useEffect(() => {
    //check URL for search params and apply filters as appropriate
    const searchData = queryString.parse(location.search);
    const parsed = arrayString(searchData, true);

    const keys = Object.keys(parsed);
    keys.map((key) => {
      if (typeof parsed[key] === 'object') {
        parsed[key].map((item) => handleFilterChange(item, key));
      } else {
        //for the search input
        handleFilterChange(parsed[key], 'searchTerm');
      }
    });

    setCurrentPage(1);
  }, []);

  useEffect(() => {
    //disable 'clear filter' button if there's no URL search params
    setClearBtnDisabled(location.search === '' || location.search === '?');
  }, [location.search]);

  useEffect(() => {
    //update pagination content
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentPageData(filteredData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, location.search]);

  const handleFilterChange = (value, key) => {
    let newFilters = filters;

    if (key === 'searchTerm') {
      //search bar - if empty, delete key
      value === '' ? delete newFilters['searchTerm'] : (newFilters['searchTerm'] = value);
    } else {
      //add to filter array
      if (newFilters[key] && newFilters[key].includes(value)) {
        //remove from array - if empty, delete key
        newFilters[key] = newFilters[key].filter((item) => item !== value);
        if (newFilters[key].length === 0) delete newFilters[key];
      } else {
        //add to array
        if (!newFilters[key]) {
          //new filter
          newFilters[key] = [];
        }
        newFilters[key].push(value);
      }
    }
    setFilters(newFilters);
    const modified = arrayString(newFilters);
    const string = queryString.stringify(modified);
    history.replace({ search: `?${string}` });
    dataFiltering();
    setCurrentPage(1);
  };

  const dataFiltering = () => {
    const filteredData = allPDFs.filter((pdf) => {
      //loop through each filter key
      return Object.keys(filters).every((filter) => {
        //if 'search' filter option, check filter string is included in pdf title
        if (filter === 'searchTerm') return pdf.title.toLowerCase().includes(filters[filter].toLowerCase());

        if (filters[filter].length === 0) return true; //no value, show it in list

        //for the rest of the filter options, check if the array contains a matching string
        if (typeof pdf.filters[filter] === 'object') {
          return Array.from(pdf.filters[filter]).some((i) => filters[filter].includes(i));
        } else {
          return filters[filter].includes(pdf.filters[filter].toString());
        }
      });
    });

    setFilteredData(filteredData);
  };

  const handleClearFilters = () => {
    history.replace({ search: '' });
    setFilters({});
    setFilteredData(allPDFs);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderFilterGroup = (title, filterGroup) => (
    <Accordion variant='custom' expanded={expanded === filterGroup} onChange={handleAccordionChange(filterGroup)}>
      <AccordionSummary expandIcon={expanded === filterGroup ? <Remove /> : <Add />}>{title}</AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth component='fieldset' variant='standard' className='fieldset'>
          <FormGroup>
            {allFilters[filterGroup].map((item, i) => (
              <FormControlLabel
                key={i}
                label={item.value}
                control={
                  <Checkbox
                    icon={<HexagonOutlined />}
                    checkedIcon={<Hexagon />}
                    checked={(filters[filterGroup] && filters[filterGroup].includes(item.id)) || false}
                    onChange={(e) => handleFilterChange(item.id, filterGroup)}
                    name={item.id}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );

  const myRef = useRef();
  return (
    <>
      <Container maxWidth='md' component='main'>
        <Box className='search-wrap'>
          <FormControl fullWidth variant='outlined' size='small'>
            <OutlinedInput
              color='primary'
              placeholder='Search'
              sx={{
                borderRadius: 10,
                paddingRight: '24px',
              }}
              id='search'
              type='text'
              name='inputValue'
              value={filters['searchTerm'] || ''}
              onChange={(e) => handleFilterChange(e.target.value, 'searchTerm')}
              endAdornment={
                <Search
                  sx={{
                    padding: '3px',
                    width: 28,
                    height: 32,
                    clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
                    backgroundColor: '#1d2f5f',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    borderRadius: 0,
                  }}
                />
              }
            />
          </FormControl>
        </Box>

        <Button // visible only on mobile
          sx={{ justifyContent: 'space-between', marginBottom: '30px', display: { sm: 'none' } }}
          fullWidth
          onClick={() => setShowDrawer(true)}
          variant='custom'
          endIcon={<FilterIcon />}
        >
          VIEW FILTERS
        </Button>

        <Grid container spacing={2}>
          <Grid sx={{ display: { sm: 'block', xs: 'none' } }} item tablet={3} sm={4} className='sidebar'>
            <Box className='wrap sidebar-top'>
              <Typography variant='h6'>Filters</Typography>
              {
                <Button onClick={() => handleClearFilters()} disabled={clearBtnDisabled} size='small' variant='custom' endIcon={<ClearFiltersIcon />}>
                  Clear
                </Button>
              }
            </Box>
            {/* render filters */}
            {renderFilterGroup('Congress', 'congress')}
            {renderFilterGroup('Product', 'product')}
            {renderFilterGroup('Presentation Type', 'type')}
            {renderFilterGroup('Therapeutic Area', 'area')}
            {renderFilterGroup('Year', 'year')}
          </Grid>
          <Grid ref={myRef} item tablet={9} sm={8}>
            <Box className='wrap pagination'>
              <Typography className='showing' sx={{ fontSize: { xs: 14, md: 16 } }}>
                Showing <strong>{filteredData.length}</strong> of <strong>{allPDFs.length}</strong> results
              </Typography>
              <Pagination currentPage={currentPage} totalCount={filteredData.length} pageSize={pageSize} onPageChange={(page) => setCurrentPage(page)} />
            </Box>
            <Box className='items'>
              {currentPageData.map((item, i) => {
                return (
                  <Paper className='item' sx={{ marginBottom: 3, padding: 2, borderRadius: '15px' }} elevation={5} key={i}>
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                        <Typography variant='div' className='item-title'>
                          {item.title}
                        </Typography>
                        <p>{item.description}</p>
                      </Grid>
                      <Grid item xs={12} className='download-btn-wrap'>
                        <Button component='a' href={item.src} target='_blank' variant='custom' endIcon={<Visibility />}>
                          View PDF
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* MOBILE Filters rendered in a Drawer */}
      <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
        <Container sx={{ padding: '20px 10% 30px', width: '90vw' }}>
          <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              onClick={() => handleClearFilters()}
              className='filter-btn'
              disabled={clearBtnDisabled}
              size='small'
              variant='custom'
              endIcon={<ClearFiltersIcon />}
            >
              Clear
            </Button>
            <IconButton onClick={() => setShowDrawer(false)} variant='hex'>
              <Close />
            </IconButton>
          </Box>
          <Box component='div' sx={{ padding: '0 18px' }}>
            <Typography color='primary' sx={{ fontSize: '18px', fontWeight: '600', margin: '10px 0' }}>
              Filters
            </Typography>
            <Button
              fullWidth
              onClick={() => {
                setShowDrawer(false);
                window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop });
              }}
              variant='custom'
              endIcon={<ReadMore />}
            >
              View Results
            </Button>
            <Typography color='primary' sx={{ margin: '15px 0', textAlign: 'center' }}>
              Showing <strong>{filteredData.length}</strong> of <strong>{allPDFs.length}</strong> results
            </Typography>
            {renderFilterGroup('Congress', 'congress')}
            {renderFilterGroup('Product', 'product')}
            {renderFilterGroup('Presentation Type', 'type')}
            {renderFilterGroup('Therapeutic Area', 'area')}
            {renderFilterGroup('Year', 'year')}
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export default Catalogue;
