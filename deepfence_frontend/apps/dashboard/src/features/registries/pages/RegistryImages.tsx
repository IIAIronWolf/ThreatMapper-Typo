import { Suspense, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaAngleDoubleUp, FaHistory, FaImages, FaTags } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { LoaderFunctionArgs, Outlet, useLoaderData, useParams } from 'react-router-dom';
import { Button, Card, CircleSpinner, TableSkeleton } from 'ui-components';

import { getRegistriesApiClient } from '@/api/api';
import { ApiDocsBadRequestResponse, ModelContainerImageWithTags } from '@/api/generated';
import { GoBack } from '@/components/GoBack';
import { RegistryIcon } from '@/components/sideNavigation/icons/Registry';
import { startVulnerabilityScanAction } from '@/features/registries/actions/startScan';
import { RegistryImagesTable } from '@/features/registries/components/RegistryImagesTable';
import { Mode, useTheme } from '@/theme/ThemeContext';
import { ApiError, makeRequest } from '@/utils/api';
import { formatMilliseconds } from '@/utils/date';
import { typedDefer, TypedDeferredData } from '@/utils/router';
import { DFAwait } from '@/utils/suspense';

export type LoaderDataType = {
  error?: string;
  message?: string;
  data?: Awaited<ReturnType<typeof getImagesForRegistry>>;
};

async function getImagesForRegistry(registryID: string): Promise<{
  images: ModelContainerImageWithTags[];
  currentPage: number;
  totalRows: number;
  message?: string;
}> {
  const result = await makeRequest({
    apiFunction: getRegistriesApiClient().listImages,
    apiArgs: [
      {
        registryId: registryID,
      },
    ],
    errorHandler: async (r) => {
      const error = new ApiError<{ message?: string }>({});
      if (r.status === 400) {
        const modelResponse: ApiDocsBadRequestResponse = await r.json();
        return error.set({
          message: modelResponse.message,
        });
      }
    },
  });

  if (ApiError.isApiError(result)) {
    throw result.value();
  }

  if (!result) {
    return {
      images: [],
      currentPage: 0,
      totalRows: 0,
    };
  }
  return {
    images: result,
    currentPage: 0,
    totalRows: 0,
  };
}

const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<TypedDeferredData<LoaderDataType>> => {
  const { accountId } = params;

  if (!accountId) {
    throw new Error('Registry Account Id is required');
  }
  return typedDefer({
    data: getImagesForRegistry(accountId),
  });
};

const HeaderComponent = ({
  timestamp,
  elementToFocusOnClose,
  setShowFilter,
}: {
  timestamp: number;
  elementToFocusOnClose: React.MutableRefObject<null>;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { account, accountId } = useParams() as {
    account: string;
    accountId: string;
  };

  return (
    <div className="flex p-2 pl-2 w-full items-center shadow bg-white dark:bg-gray-800">
      <GoBack />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        REGISTRY ACCOUNTS / {account.toUpperCase()} / {accountId}
      </span>
      <div className="ml-auto flex items-center gap-x-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-200">
            {formatMilliseconds(timestamp)}
          </span>
          <span className="text-gray-400 text-[10px]">Last refreshed</span>
        </div>
        <Button
          className="ml-auto bg-blue-100 dark:bg-blue-500/10"
          size="xs"
          color="normal"
          onClick={() => {
            setShowFilter(true);
          }}
        >
          <IconContext.Provider
            value={{
              className: 'w-4 h-4',
            }}
          >
            <FaHistory />
          </IconContext.Provider>
        </Button>

        <div className="relative">
          <span className="absolute left-0 top-0 inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
          <Button
            className="ml-auto bg-blue-100 dark:bg-blue-500/10"
            size="xs"
            color="normal"
            ref={elementToFocusOnClose}
            onClick={() => {
              setShowFilter(true);
            }}
          >
            <IconContext.Provider
              value={{
                className: 'w-4 h-4',
              }}
            >
              <FiFilter />
            </IconContext.Provider>
          </Button>
        </div>
      </div>
    </div>
  );
};

const RegistriesCountComponent = ({ theme }: { theme: Mode }) => {
  const loaderData = useLoaderData() as LoaderDataType;
  return (
    <div className="flex flex-col gap-y-2">
      <Card className="p-4 grid grid-flow-row-dense gap-y-8">
        <Suspense
          fallback={
            <div className="min-h-[300px] flex items-center justify-center">
              <CircleSpinner size="md" />
            </div>
          }
        >
          <DFAwait resolve={loaderData.data}>
            {(resolvedData: any) => {
              return (
                <>
                  <div className="grid grid-flow-col-dense gap-x-4">
                    <div className="bg-red-100 dark:bg-red-500/10 rounded-lg flex items-center justify-center">
                      <div className="w-14 h-14 text-blue-500 dark:text-blue-400">
                        <RegistryIcon />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-gray-200 tracking-wider">
                        Registries
                      </h4>
                      <div className="mt-2">
                        <span className="text-2xl font-light text-gray-900 dark:text-gray-200">
                          300
                        </span>
                        <h5 className="text-xs text-gray-500 dark:text-gray-200 mb-2">
                          Total count
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-x-4 justify-center items-center">
                    <div className="gap-x-2 flex flex-col justify-center">
                      <div className="pr-4 flex items-center gap-x-2">
                        <IconContext.Provider
                          value={{
                            className: 'h-4 w-4 text-teal-500 dark:text-teal-400',
                          }}
                        >
                          <FaImages />
                        </IconContext.Provider>
                        <span className="text-lg text-gray-900 dark:text-gray-200 font-light">
                          300
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Total Images
                      </span>
                    </div>
                    <div className="gap-x-2 flex flex-col justify-center">
                      <div className="pr-4 flex items-center gap-x-2">
                        <IconContext.Provider
                          value={{
                            className: 'h-4 w-4 text-indigo-600 dark:text-indigo-400',
                          }}
                        >
                          <FaTags />
                        </IconContext.Provider>
                        <span className="text-lg text-gray-900 dark:text-gray-200 font-light">
                          200
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Total Tags
                      </span>
                    </div>
                    <div className="gap-x-2 flex flex-col justify-center">
                      <div className="pr-4 flex items-center gap-x-2">
                        <IconContext.Provider
                          value={{
                            className: 'h-4 w-4 text-indigo-600 dark:text-indigo-400',
                          }}
                        >
                          <FaAngleDoubleUp />
                        </IconContext.Provider>
                        <span className="text-lg text-gray-900 dark:text-gray-200 font-light">
                          10
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        In Progress
                      </span>
                    </div>
                  </div>
                </>
              );
            }}
          </DFAwait>
        </Suspense>
      </Card>
    </div>
  );
};

const RegistryImages = () => {
  const { mode } = useTheme();
  const params = useParams() as {
    type: string;
    accuntId: string;
  };
  const loaderData = useLoaderData() as LoaderDataType;
  const { data, error } = loaderData;

  const elementToFocusOnClose = useRef(null);
  const [showFilter, setShowFilter] = useState(false);

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const currentTime = new Date().getTime();

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderComponent
        elementToFocusOnClose={elementToFocusOnClose}
        setShowFilter={setShowFilter}
        timestamp={currentTime}
      />
      <div className="grid grid-cols-[400px_1fr] p-2 gap-x-2">
        <div className="self-start grid gap-y-2">
          <RegistriesCountComponent theme={mode} />
        </div>
        <Suspense fallback={<TableSkeleton columns={2} rows={10} size={'md'} />}>
          <DFAwait resolve={loaderData.data}>
            {(resolvedData: LoaderDataType['data']) => {
              return <RegistryImagesTable data={resolvedData?.images ?? []} />;
            }}
          </DFAwait>
        </Suspense>
      </div>
      <Outlet />
    </>
  );
};

export const module = {
  loader,
  action: startVulnerabilityScanAction,
  element: <RegistryImages />,
};
