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
  const { results, page, perPage, updatePage } = useAppApi();
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [pagination, setPagination] = useState([]);

  const updatePagination = () => {
    const totalPages = Math.ceil(Number(results.total_count) / Number(perPage));
    setTotalResults(results.total_count);
    if (!results.total_count) {
      setTotalResults(0);
    } else {
      setNumPages(totalPages);
    }
    setShowNext(false);
    if (page < totalPages) {
      setNextPage(page + 1);
      setShowNext(true);
    }
    setShowPrevious(false);
    if (page > 1) {
      setPreviousPage(page - 1);
      setShowPrevious(true);
    }
    setPagination(paginate(results.total_count, page, perPage, 10));
  };

  useEffect(() => {
    updatePagination();
  }, [results]);

  const gotoPage = (p) => {
    updatePage(p);
    navigate(`/${p}`);
  };

  return (
    <Box>
      <SimpleGrid columns={[1, 2, 4]} spacing="10px" mb="10px">
        <Box>
          Total Results <Tag colorScheme="green">{totalResults}</Tag>
        </Box>
        <Box>
          {results.items.length ? (
            <span>
              Displaying <Tag colorScheme="green">{results.items.length}</Tag>{' '}
              Results
            </span>
          ) : (
            ''
          )}
        </Box>
        <Box>
          {numPages ? (
            <span>
              Page <Tag colorScheme="green">{page}</Tag>/{' '}
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
            ? pagination.pages.map((pageNo) => (
                <Button
                  key={pageNo}
                  ml="2px"
                  mr="2px"
                  onClick={() => gotoPage(pageNo)}
                >
                  {pageNo}
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
