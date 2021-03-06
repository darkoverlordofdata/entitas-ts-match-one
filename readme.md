# Example

A recreation of the example athttps://github.com/sschmid/Match-One

created using entitas-ts cli as the starting point:

    git clone https://github.com/darkoverlordofdata/template matchone
    cd matchone
    
    entitas init matchone
    
    entitas create -c Movable
    entitas create -c Position x:number y:number
    entitas create -c Destroy
    entitas create -c GameBoardCache grid
    entitas create -c GameBoard columns:number row:number
    entitas create -c GameBoardElement
    entitas create -c Input x:number y:number
    entitas create -c Interactive
    entitas create -c Resource name:string
    entitas create -c View sprite
    entitas create -c Score value:number
    entitas create -e GameBoardCache
    entitas create -e GameBoard
    entitas create -e Score
    entitas create -s DestroySystem IReactiveSystem ISetPool
    entitas create -s FallSystem IReactiveSystem ISetPool
    entitas create -s FillSystem IReactiveSystem ISetPool
    entitas create -s CreateGameBoardCacheSystem ISetPool
    entitas create -s GameBoardSystem IInitializeSystem IReactiveSystem ISetPool
    entitas create -s ProcessInputSystem IReactiveSystem ISetPool
    entitas create -s RenderPositionSystem IReactiveSystem
    entitas create -s AddViewSystem IReactiveSystem
    entitas create -s RemoveViewSystem IReactiveSystem ISetPool IEnsureComponents
    entitas create -s ScoreSystem IInitializeSystem IReactiveSystem ISetPool
    entitas create -x Pool createRandomPiece:Entity x:number y:number
    entitas create -x Pool createBlocker:Entity x:number y:number
    entitas generate
    

# MIT License

Copyright (c) 2015 Bruce Davidson &lt;darkoverlordofdata@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

