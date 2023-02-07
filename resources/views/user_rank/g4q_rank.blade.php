<x-app-layout>
    <div class="pt-2">
        <div class='py-4' align='center'>いいね数(問題)ランキング</div>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @foreach($users as $idx => $user)
                <div class="py-2">
                    
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class='p-4'>
                            <div class="text-xl text-gray-900">
                                Rank：{{ $idx+1 }}
                            </div>
                            
                            <div class='pl-3 pt-4'>
                                <div class="text-lg text-gray-900">
                                    {{ $user->name }}
                                </div>
                                
                                <div class=" text-gray-900">
                                    いいね数(問題)：{{ $user->g4q_count }}
                                </div>
                            </div>
                            
                            <div>
                                <form action="/home_user" method='POST'>
                                @csrf
                                    <div class='pt-2'>
                                        <input type='hidden' value='{{ $user->id }}' name='user_id'>
                                        <input type='submit' value='このユーザの問題を見る'>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            @endforeach
        </div>
    </div>
    
<div class="paginete">{{ $users->links()}}</div>
</x-app-layout>