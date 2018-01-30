module Main where

import Prelude
import Control.Monad.Aff
import Control.Monad.Eff
import Control.Monad.Aff.Console (CONSOLE, logShow)
import Data.Tuple
import Data.Either

type X = forall eff a. String -> Array String -> (Tuple String (Array String) -> Eff eff a) -> Eff eff a

foreign import push :: X
foreign import pop :: X

asyncPush a s = makeAff (\callback -> do
  push a s (\ x -> callback $ Right x)
  pure $ nonCanceler)

asyncPop a s = makeAff (\callback -> do
  pop a s (\x -> callback $ Right x)
  pure $ nonCanceler)

main = launchAff $ do
  Tuple a s <-  asyncPush "brick1" []
  logShow a
  logShow s
  logShow "push"
  Tuple a s <- asyncPush "brick2" s
  logShow a
  logShow s
  logShow "push"
  Tuple a s <- asyncPush "brick3" s
  logShow a
  logShow s
  logShow "push"
  Tuple a s <- asyncPop "pop" s
  logShow a
  logShow s
  logShow "pop"
  Tuple a s <- asyncPop "pop" s
  logShow a
  logShow s
  logShow "pop"

