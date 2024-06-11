import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from 'react-query'
import { GenericPage } from '../../components/GenericPage'
import * as S from './styles'
import { api } from '../../lib/axios'
import styled from 'styled-components'
import InputField from '../../components/Input/InputField'
import { Skeleton } from '../../components/Skeleton'
import { PrimaryButton } from '../../components/PrimaryButton'
import { SearchIcon } from '../../components/Input/assets/Search'

const searchSchema = z.object({
  city: z.string().optional(),
  recordID: z.string().optional(),
})

type SearchFormInputs = z.infer<typeof searchSchema>

type Result = {
  RecordID: string
  City: string
  State: string
  Year: string
}

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
`

const ResultItem = styled.li`
  background: #f4f4f4;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LoadingSkeleton = styled(Skeleton)`
  height: 116px;
  width: 100%;
  margin-bottom: 10px;
`

const NoResults = styled.div`
  padding: 15px;
  text-align: center;
  color: #888;
`

export function HomePage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
  })

  const [searchParams, setSearchParams] = useState<SearchFormInputs | null>(
    null,
  )
  const [page, setPage] = useState(0)

  const {
    data: results = [],
    isLoading,
    error,
  } = useQuery<Result[], Error>(
    ['reports', searchParams, page],
    async () => {
      if (!searchParams) return []
      const params = new URLSearchParams()
      if (searchParams.city) params.append('city', searchParams.city)
      if (searchParams.recordID)
        params.append('recordID', searchParams.recordID)
      params.append('limit', '10')
      params.append('offset', (page * 10).toString())

      const response = await api.get<Result[]>(`/reports?${params.toString()}`)
      return response.data
    },
    {
      enabled: !!searchParams,
      keepPreviousData: true,
    },
  )

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    setPage(0)
    setSearchParams(data)
  }

  return (
    <>
      <GenericPage.Root>
        <S.Header>
          <S.WrapperLogoAndLogoTitle>
            <GenericPage.Logo />
            <GenericPage.LogoTitle>
              Delegacia de Nova York
            </GenericPage.LogoTitle>
          </S.WrapperLogoAndLogoTitle>
        </S.Header>

        <GenericPage.Divider />
        <S.MainContent>
          <S.WelcomeText>Bem vindo! </S.WelcomeText>
          <S.WelcomeQuestion>Qual será sua pesquisa hoje?</S.WelcomeQuestion>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <InputField
                  label="City"
                  control={control}
                  placeholder="Enter city"
                  type="text"
                  {...field}
                />
              )}
            />
            <Controller
              name="recordID"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Record ID"
                  control={control}
                  placeholder="Enter record ID"
                  type="text"
                  {...field}
                />
              )}
            />
            <PrimaryButton
              style={{ marginTop: '16px', marginLeft: 'auto' }}
              type="submit"
            >
              <SearchIcon />
              Search
            </PrimaryButton>
          </form>
        </S.MainContent>
        <S.MainContent>
          <h2>Resultados:</h2>
          {isLoading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : results.length > 0 ? (
            <>
              <ResultList>
                {results.map((result, index) => (
                  <ResultItem key={index}>
                    <div>
                      <strong>Record ID:</strong> {result.RecordID}
                      <br />
                      <strong>City:</strong> {result.City}
                      <br />
                      <strong>State:</strong> {result.State}
                      <br />
                      <strong>Year:</strong> {result.Year}
                    </div>
                  </ResultItem>
                ))}
              </ResultList>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '16px 0 ',
                  marginBottom: '2rem',
                }}
              >
                <PrimaryButton
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                >
                  Anterior
                </PrimaryButton>

                <PrimaryButton
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={results.length < 10}
                >
                  Próximo
                </PrimaryButton>
              </div>
            </>
          ) : (
            <NoResults>Não foram encontrados resultados.</NoResults>
          )}
        </S.MainContent>
      </GenericPage.Root>
    </>
  )
}
