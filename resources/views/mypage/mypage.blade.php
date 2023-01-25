<x-app-layout>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div>
                <a href='{{ route("my_completes") }}'>完了した問題（{{ $completes }}）</a>
            </div>
            
            <div>
                <a href='{{ route("my_laters") }}'>後で解く問題（{{ $laters }}）</a>
            </div>
            
            <div>
                <a href='{{ route("my_creates") }}'>作成した問題（{{ $creates }}）</a>
            </div>
            
            <div>
                <a href='{{ route('my_comments') }}'>送ったコメント（{{ $comments }}）</a>
            </div>
            
            
            
        </div>
    </div>
    
    
</x-app-layout>