import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  SimpleGrid,
  Tag,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import paginate from 'jw-paginate';
import { useAppApi } from '../Api';

export default function DisplayResultInfoPagination() {
  const api = useAppApi();
  const navigate = useNavigate();

  const [numPages, setNumPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [pagination, setPagination] = useState([]);

  const updatePagination = () => {
    const totalPages = Math.ceil(
      Number(api.results.total_count) / Number(api.perPage)
    );
    setTotalResults(api.results.total_count);
    if (!api.results.total_count) {
      setTotalResults(0);
    } else {
      setNumPages(totalPages);
    }
    setShowNext(false);
    if (api.page < totalPages) {
      setNextPage(api.page + 1);
      setShowNext(true);
    }
    setShowPrevious(false);
    if (api.page > 1) {
      setPreviousPage(api.page - 1);
      setShowPrevious(true);
    }
    setPagination(paginate(api.results.total_count, api.page, api.perPage, 10));
  };

  useEffect(() => {
    updatePagination();
  }, [api.results]);

  const gotoPage = (p) => {
    api.updatePage(p);
    navigate(`/${p}`);
  };

  return (
    <Box>
      <SimpleGrid columns={[2, 3, 4]} spacing="40px" mb="10px">
        <Box>
          Total Results <Tag colorScheme="green">{totalResults}</Tag>
        </Box>
        <Box>
          {api.results.items.length ? (
            <span>
              Displaying{' '}
              <Tag colorScheme="green">{api.results.items.length}</Tag> Results
            </span>
          ) : (
            ''
          )}
        </Box>
        <Box>
          {numPages ? (
            <span>
              Page <Tag colorScheme="green">{api.page}</Tag>/{' '}
              <Tag colorScheme="green">{numPages}</Tag>
            </span>
          ) : (
            ' '
          )}
        </Box>
      </SimpleGrid>
      <Divider />
      <SimpleGrid mt="5px" mb="5px">
        <Box>
          {showPrevious ? (
            <IconButton
              mr="2px"
              onClick={() => gotoPage(previousPage)}
              icon={<ChevronLeftIcon />}
            />
          ) : (
            ''
          )}
          {pagination.totalPages
            ? pagination.pages.map((page) => (
                <Button ml="2px" mr="2px" onClick={() => gotoPage(page)}>
                  {page}
                </Button>
              ))
            : ''}
          {showNext ? (
            <IconButton
              ml="2px"
              onClick={() => gotoPage(nextPage)}
              icon={<ChevronRightIcon />}
            />
          ) : (
            ''
          )}
        </Box>
      </SimpleGrid>
      <Divider />
    </Box>
  );
}
