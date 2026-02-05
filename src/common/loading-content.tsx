"use client";

import clsx from "clsx";
import { useEffect } from "react";
import LoadingIndicator from "./loading-Indicator";
import "./loading-content.css";
import ErrorContent from "./error-content";
import useDataRef from "../hooks/use-data-ref";

/**
 *
 * @param {LoadingUIProps} props
 * @returns
 */
function LoadingContent(props: any) {
  const {
    fullHeight,
    centered,
    onMount,
    component: Component,
    loading,
    Loading,
    LoadingProps,
    renderLoading,
    error,
    Error,
    ErrorProps,
    renderError,
    empty,
    renderEmpty,
    onRetry,
    blocking,
    Blocking,
    BlockingProps,
    renderBlocking,
    children,
    className,
    ...restProps
  } = props;
  const dataRef = useDataRef({ onMount });

  useEffect(() => {
    dataRef.current.onMount?.();
  }, [dataRef]);

  if (!loading && !error && !empty) {
    return typeof children === "function" ? children() : children;
  }

  return (
    <div
      className={clsx(
        "LoadingContent",
        className,
        fullHeight && "LoadingContent--fullHeight",
        centered && "LoadingContent--centered"
      )}
      {...restProps}
    >
      {blocking ? renderBlocking?.(props) : null}
      {error ? renderError?.(props) : renderLoading?.(props)}
      {empty ? renderEmpty?.(props) : null}
    </div>
  );
}

LoadingContent.defaultProps = {
  Component: "div",
  Loading: CustomLoading,
  renderLoading,
  Error: CustomError,
  renderError,
  Blocking: "div",
  renderBlocking,
};

export default LoadingContent;

function CustomLoading(props: any) {
  return (
    <div {...props}>
      <LoadingIndicator />
    </div>
  );
}

/**
 *
 * @param {LoadingUIProps} props
 */
function renderLoading(props: any) {
  const Loading = props.Loading;
  return (
    <Loading
      {...props.LoadingProps}
      className={clsx("LoadingContent-loading", props.LoadingProps?.className)}
    />
  );
}

function CustomError(props: any) {
  return <ErrorContent {...props} />;
}

/**
 *
 * @param {LoadingUIProps} props
 */
function renderError(props: any) {
  const Error = props.Error;
  return (
    <Error
      onRetry={props.onRetry}
      {...props.ErrorProps}
      className={clsx("LoadingContent-error", props.ErrorProps?.className)}
    />
  );
}

/**
 *
 * @param {LoadingUIProps} props
 */
function renderBlocking(props: any) {
  const Blocking = props.Blocking;
  return (
    <Blocking
      {...props.BlockingProps}
      className={clsx(
        "LoadingContent-blocking",
        props.BlockingProps?.className
      )}
    />
  );
}

/**
 * @typedef {{
 * fullHeight: boolean;
 * centered: boolean;
 * Component: any;
 * children: React.ReactNode | (props: LoadingUIProps) => React.ReactNode,
 * onMount: Function;
 * loading: boolean;
 * Loading: any;
 * LoadingProps: any;
 * renderLoading: (props: LoadingUIProps) => React.ReactNode,
 * error: boolean;
 * Error: any;
 * ErrorProps: any;
 * renderError: (props: LoadingUIProps) => React.ReactNode;
 * errorTitle:  React.ReactNode;
 * errorDescription:  React.ReactNode;
 * onRetry: Function;
 * onCancel: Function;
 * cancelText: Function;
 * blocking: boolean;
 * Blocking: any;
 * BlockingProps: any;
 * renderBlocking: (props: LoadingUIProps) => React.ReactNode
 * } & React.ComponentPropsWithoutRef<'div'>} LoadingUIProps
 */
