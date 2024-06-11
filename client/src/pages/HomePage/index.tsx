import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<SearchFormInputs> = async (data) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (data.city) params.append('city', data.city)
      if (data.recordID) params.append('recordID', data.recordID)

      const response = await api.get(`/reports?${params.toString()}`)
      setResults(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <GenericPage.Root hasNoScrollbar>
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
                  name="city"
                  control={control}
                  placeholder="Enter city"
                  type="text"
                />
              )}
            />
            <Controller
              name="recordID"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Record ID"
                  name="recordID"
                  control={control}
                  placeholder="Enter record ID"
                  type="text"
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
          {loading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : results.length > 0 ? (
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
          ) : (
            <NoResults>No results found</NoResults>
          )}
        </S.MainContent>
      </GenericPage.Root>
    </>
  )
}
